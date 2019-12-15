import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body } from '@nestjs/common';
import { ArticleTypeService } from './articletype.service';
import { ArticleType } from '../entities/articleType.entity';

@Controller('articletype')
export class ArticleTypeController {
    constructor(private readonly articleTypeService: ArticleTypeService) { }

    @Get('find')
    async find(): Promise<ArticleType | ArticleType[]> {
        return await this.articleTypeService.find();
    }

    @Get('findOne/:id')
    async findOne(@Param() params): Promise<Object> {
        return  await this.articleTypeService.findOne(params.id);
    }
}
