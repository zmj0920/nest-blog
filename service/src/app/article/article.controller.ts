import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../entities/article.entity';
import { ApiTags, ApiHeader, ApiCreatedResponse } from '@nestjs/swagger';

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
 
  @Get("find")
  async find(): Promise<Object | Object[]> {
    return await this.articleService.find()
  }
  @Get("findLimit/:pageNum/:pageSize")
  async findLimit(@Param() params): Promise<Object | Object[]> {
    return await this.articleService.findLimit(params.pageNum,params.pageSize)
  }

  @Get('findOne/:id')
  async findOne(@Param() params): Promise<Object> {
    return  await this.articleService.findOne(params.id);
  }

  @Get('findTypeOne/:id/:pageNum/:pageSize')
  async findTypeOne(@Param() params): Promise<Object> {
    return  await this.articleService.findTypeOne(params.id,params.pageNum,params.pageSize);
  }
}
