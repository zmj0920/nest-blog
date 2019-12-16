import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from 'typeorm';
import { ArticleType } from './articleType.entity';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
    synchronize: true,
})

export class Article {

    // 编号
    @ApiProperty()
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    // @Column({ type: "int" })
    // @ApiProperty()
    // typeId: number;

    // 文章标题
    @ApiProperty()
    @Column({ type: "text" })
    title: string;

    // 文章内容
    @ApiProperty()
    @Column({ type: "longtext" })
    articleContent: string;

    // 文章介绍
    @ApiProperty()
    @Column({ type: "text" })
    introduce: string;

    // 添加时间
    @ApiProperty()
    @Column({ type: "datetime" })
    addTime: Date;

    // 查看计数
    @ApiProperty()
    @Column({ type: "int" })
    viewCount: number;

    // 文章类别
    @ApiProperty()
    @ManyToOne(type => ArticleType, articleType => articleType.articles, { cascade: true })
    @JoinTable()
    articleType: ArticleType;

    @ApiProperty()
    @ManyToOne(type => User, user => user.articles, { cascade: true })
    @JoinTable()
    user: User;
}
