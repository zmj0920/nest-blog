import { Injectable,HttpException } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, getRepository, getConnection } from 'typeorm';
import { ArticleType } from '../entities/articleType.entity';
import { User } from '../entities/user.entity';
@Injectable()
export class ArticleService {
    constructor(@InjectRepository(Article)
    private readonly articleRepository: Repository<Article>) { }

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
        const sum = await this.articleRepository.find();
        return { success: 200, total: sum.length, pageNum: pageNum, pageSize: pageSize, data: article };
    }


    async findLimitAll(pageNum: number, pageSize: number): Promise<Object | Object[]> {
        const article = await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id')
            .select(["article.id", "article.title", "article.introduce","article.sortNumber", "article.articleContent", "article.addTime", "article.viewCount",
                "article_type.id", "user.name"]).offset((pageNum - 1) * pageSize).limit(pageSize)
            .getRawMany()
        const sum = await this.articleRepository.find();
        return { success: 200, total: Number(sum.length), pageNum: Number(pageNum), pageSize: Number(pageSize), data: article };
    }


    async articleDetail(id: number): Promise<Object | Object[]> {
        return await getConnection()
            .createQueryBuilder(Article, 'article')
            .leftJoinAndSelect(ArticleType, 'article_type', 'article.articleTypeId=article_type.id')
            .leftJoinAndSelect(User, 'user', 'article.userId=user.id').where("article.id = :id", { id: id })
            .select(["article.id", "article.title", "article.introduce", "article.articleContent", "article.addTime", "article.viewCount",
                "article_type.typeName", "user.name"])
            .getRawMany();
    }

    async findTypeOne(id: number, pageNum: number, pageSize: number): Promise<Object | Object[]> {
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


    async save(data: Article): Promise<Article | Article[]> {
        return await this.articleRepository.save(
            await this.articleRepository.create(data)
        );
    }

    async update(id:number,updateInput: Article): Promise<void> {
        console.log(id)
        const existing = await this.articleRepository.findOne(id);
        console.log(existing)
        if (!existing) throw new HttpException(`更新失败，ID 为 '${JSON.stringify(id)}' 的文章不存在`, 404);
        if (updateInput.title) existing.title = updateInput.title;
        if (updateInput.articleContent) existing.articleContent = updateInput.articleContent;
        if (updateInput.articleType) existing.articleType = updateInput.articleType;
        if (updateInput.introduce) existing.introduce = updateInput.introduce;
        if (updateInput.sortNumber) existing.sortNumber = updateInput.sortNumber;
        if (updateInput.addTime) existing.addTime = updateInput.addTime;
        await this.articleRepository.save(existing);
    }


    async remove(id: number): Promise<void> {
        const existing = await this.articleRepository.findOne(id);
        if (!existing) throw new HttpException(`删除失败，ID 为 '${id}' 的文章不存在`, 404);
        await this.articleRepository.remove(existing);
    }
}
