import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertController } from './advert.controller';
import { AdvertService } from './advert.service';
import { Advert } from '../entities/advert.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Advert])],
    providers: [AdvertService],
    controllers: [AdvertController],
})
export class AdvertModule {}
