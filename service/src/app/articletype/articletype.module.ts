import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTypeController } from './articletype.controller';
import { ArticleTypeService } from './articletype.service';
import { ArticleType } from '../entities/articleType.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleType])],
    providers: [ArticleTypeService],
    controllers: [ArticleTypeController],
})
export class ArticleTypeModule {}
