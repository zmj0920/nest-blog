import { Get, Controller, Post, Response, Param, HttpStatus, Request, Body, Headers, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';
import { ApiTags, ApiHeader, ApiCreatedResponse } from '@nestjs/swagger';

@ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
})
@ApiTags('用户')
@ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: User,
})
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('root1')
    root(): Object {
        // tslint:disable-next-line:no-console
        return this.userService.root();
    }


    @Get('root2')
    root2(@Headers() Headers, @Req() req: Request): Object {
        console.log(req.headers['authorization'])
        return Headers['authorization']
    }


    @Post('login')
    async findOne(@Body() body): Promise<Object> {
        return await this.userService.login(body.name,body.pwd);
    }

    @Get('find')
    async find(): Promise<User[]> {
        return await this.userService.find();
    }

    @Post('create')
    async create(@Body() body): Promise<User|User[]> {
        const user = new User();
        user.name = body.name
        user.pwd = body.pwd
        user.gender = body.gender
        user.avatar = body.avatar
        user.phone=body.phone
        return await this.userService.create(user);
    }

}
