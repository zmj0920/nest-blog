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
                "article_type.typeName", "user.name"]).orderBy({
                    "article.sortNumber": "DESC",
                    "article.id": "DESC"
                })
            .getRawMany()
        return { success: 200, total: 100, pageNum: 10, pageSize: 20, data: article };
    }


    async findLimit(pageNum: number, pageSize: number): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id')
            .select(["article.id", "article.title", "article.introduce", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"]).offset((pageNum - 1) * pageSize).limit(pageSize).orderBy({
                    "article.sortNumber": "DESC",
                    "article.id": "DESC"
                })
            .getRawMany()
        const  sum  =  await this.articleRepository.find();
        return { success: 200, total: sum.length, pageNum: pageNum, pageSize: pageSize, data: article };
    }



    async findOne(id: number): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id').where("article.id = :id", { id: id })
            .select(["article.id", "article.title", "article.introduce", "article.articleContent", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"])
            .getRawMany();

        return { success: 200, data: article };
    }


    async findTypeOne(id: number,pageNum: number, pageSize: number): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id').where("article_type.id = :id", { id: id })
            .select(["article.id", "article.title", "article.introduce", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"]).offset((pageNum - 1) * pageSize).limit(pageSize).orderBy({
                    "article.sortNumber": "DESC",
                    "article.id": "DESC"
                })
            .getRawMany();
        const sum = await this.articleRepository.find();
        return { success: 200, total: sum.length, pageNum: pageNum, pageSize: pageSize, data: article };
    }


    async save(data:Article):Promise<Article>{
        return await this.articleRepository.save(
            await this.articleRepository.create(data)
        );
    }
}
