import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
    synchronize: true,
})

export class ArticleType {

    // 编号
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: "int"})
    id: number;

    // 文章类别名称
    @ApiProperty()
    @Column()
    typeName: string;

    // 排序
    @ApiProperty()
    @Column({ type: "int"})
    orderNum: number;

    // 图标
    @ApiProperty()
    @Column()
    icon:string ;

    @OneToMany(type => Article, article => article.articleType)
    articles: Article[];
}
