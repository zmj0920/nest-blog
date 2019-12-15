import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { Advert } from '../entities/advert.entity';


@Controller('advert')
export class AdvertController {
    constructor(private readonly advertService: AdvertService) { }
  
    @Get('find')
    async find(): Promise<Object> {
        return await this.advertService.find();
    }
}
