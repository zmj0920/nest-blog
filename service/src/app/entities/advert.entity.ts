import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from './article.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
    synchronize: true,
})

export class Advert {

    // 编号
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    // 广告链接
    @ApiProperty()
    @Column()
    url: string;
    
    // 图片链接
    @ApiProperty()
    @Column()
    imgurl: string;
   
}
