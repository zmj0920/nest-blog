import { Injectable } from '@nestjs/common';
import { ArticleType } from '../entities/articleType.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class ArticleTypeService {
    constructor(@InjectRepository(ArticleType)
    private readonly articleTypeRepository: Repository<ArticleType>) { }

    async find(): Promise<ArticleType|ArticleType[]> {
        return await this.articleTypeRepository.find();
    }

    async findOne(id: number): Promise<Object | Object[]> {
        const articleType= await this.articleTypeRepository.find({ relations: ["articles"] ,where: { id: id }});
        return { success: 200, data: articleType };
    }
}
