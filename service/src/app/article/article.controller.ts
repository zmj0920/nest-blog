import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from '../entities/article.entity';
import { ApiTags, ApiHeader, ApiCreatedResponse } from '@nestjs/swagger';
import * as jwt from "jsonwebtoken";
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
    return await this.articleService.findLimit(params.pageNum, params.pageSize)
  }

  @Get("findLimitAll/:pageNum/:pageSize")
  async findLimitAll(@Param() params): Promise<Object | Object[]> {
    return await this.articleService.findLimitAll(params.pageNum, params.pageSize)
  }



  @Get('findOne/:id')
  async findOne(@Param() params): Promise<Object> {
    return await this.articleService.findOne(params.id);
  }


  @Get('articleDetail/:id')
  async articleDetail(@Param() params): Promise<Object> {
    return await this.articleService.articleDetail(params.id);
  }

  @Get('findTypeOne/:id/:pageNum/:pageSize')
  async findTypeOne(@Param() params): Promise<Object> {
    return await this.articleService.findTypeOne(params.id, params.pageNum, params.pageSize);
  }


  @Post('create')
  async create(@Body() body): Promise<Article|Article[]> {
    const article = new Article();
    if (body) {
      article.title = body.title
      article.articleType = body.articleType
      article.introduce = body.introduce
      article.articleContent = body.articleContent
      article.sortNumber = body.sortNumber
      article.viewCount = 0;
      article.addTime = new Date()
      jwt.verify(body.token, 'aaa', (err: any, decoded) => {
        if (!err) {
          article.user = decoded.id
        }
      })
    }

    return await this.articleService.save(article);
  }

  @Post('update')
  async update(@Body() body): Promise<Object> {
    console.log(body)
    const article = new Article();
    if (body) {
      article.title = body.title
      article.articleType = body.articleType
      article.introduce = body.introduce
      article.articleContent = body.articleContent
      article.sortNumber = body.sortNumber
      article.viewCount = 0;
      article.addTime = new Date()
      jwt.verify(body.token, 'aaa', (err: any, decoded) => {
        if (!err) {
          article.user = decoded.id
        }
      })
    }
    return await this.articleService.update(body.id);
  }
}
