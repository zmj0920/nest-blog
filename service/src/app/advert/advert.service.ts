import { Injectable } from '@nestjs/common';
import { Advert } from '../entities/advert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdvertService {
    constructor(@InjectRepository(Advert)
    private readonly advertRepository: Repository<Advert>) { }
   
    async find(): Promise<Object> {
        const advert= await this.advertRepository.find();
        return { success:200, data: advert };
    }
}
