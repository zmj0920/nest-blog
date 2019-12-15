import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  @Get("find")
  async find(): Promise<Object | Object[]> {
    return await this.articleService.find()
  }

  @Get('findOne/:id')
  async findOne(@Param() params): Promise<Object> {
    return  await this.articleService.findOne(params.id);
  }

  @Get('findTypeOne/:id')
  async findTypeOne(@Param() params): Promise<Object> {
    return  await this.articleService.findTypeOne(params.id);
  }
}
