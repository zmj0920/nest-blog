import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { Advert } from '../entities/advert.entity';
import { ApiTags, ApiHeader, ApiCreatedResponse } from '@nestjs/swagger';

@ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
})
@ApiTags('广告')
@ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Advert,
})
@Controller('advert')
export class AdvertController {
    constructor(private readonly advertService: AdvertService) { }
  
   
    @Get('find')
    async find(): Promise<Object> {
        return await this.advertService.find();
    }
}
