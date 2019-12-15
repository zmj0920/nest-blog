import { Injectable } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import { ArticleType } from '../entities/articleType.entity';
import { User } from '../entities/user.entity';
@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article)
    private readonly articleRepository: Repository<Article>) { }

    async find(): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id')
            .select(["article.id", "article.title", "article.introduce", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"])
            .getRawMany()
        return { success: 200, total: 100, pageNum: 10, pageSize: 20, data: article };
    }


    async findOne(id: number): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id').where("article.id = :id", { id: id })
            .select(["article.id", "article.title", "article.introduce","article.articleContent", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"])
            .getRawMany();

        return { success: 200, data: article };
    }


    async findTypeOne(id: number): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id').where("article_type.id = :id", { id: id })
            .select(["article.id", "article.title", "article.introduce","article.articleContent", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"])
            .getRawMany();

        return { success: 200, data: article };
    }
}
