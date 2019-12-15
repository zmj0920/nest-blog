import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from 'nestjs-config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './app/user/user.module';
import {ArticleModule} from './app/article/article.module';
import {ArticleTypeModule} from './app/articletype/articletype.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => config.get('database'),
        inject: [ConfigService],
    }),
      UserModule,
      ArticleModule,
      ArticleTypeModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
