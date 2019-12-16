import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
    synchronize: true,
})

export class User {

    // 编号
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    // 账号
    @ApiProperty()
    @Column()
    name: string;

    // 密码
    @ApiProperty()
    @Column()
    pwd: string;

    // 手机号
    @ApiProperty()
    @Column()
    phone: string;

    // 性别
    @ApiProperty()
    @Column()
    gender: boolean;

    // 头像
    @ApiProperty()
    @Column()
    avatar: string;

    @ApiProperty()
    @OneToMany(type => Article, article => article.articleType)
    articles: Article[];
}
