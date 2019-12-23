import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { join } from 'path';
import * as serveStatic from 'serve-static';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    origin: [ 'http://localhost:3002', 'http://localhost:3000', 'http://docs.521em.cn','http://blog.521em.cn',
    'http://47.95.225.57:3002'],
    credentials: true,
  }));
  app.use('/public', serveStatic(join(__dirname, '../public'), {
    maxAge: '1d',
    extensions: ['jpg', 'jpeg', 'png', 'gif'],
   }));
  const options = new DocumentBuilder()
   .setTitle('API接口')
   .setDescription('The  API description')
   .setVersion('1.0')
   .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.startAllMicroservicesAsync();
  await app.listen(5000);
}
bootstrap();
