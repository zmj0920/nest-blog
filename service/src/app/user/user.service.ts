import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as jwt from "jsonwebtoken";

interface TokenData {
    name: string;
    pwd: string;
}
@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>) { }
    secret = 'aaa'; //加密的时候混淆
    root(): Object {
        const data: TokenData = { name: 'admin', pwd: '123456' };
        const token = jwt.sign(data, this.secret, {
            expiresIn: 60 * 60 * 1  // 1小时过期
        });
        const decoded = jwt.verify(token, this.secret, (err: any, decoded: TokenData) => {
            if (!err) {
                return { name: decoded.name, pwd: decoded.pwd }
            }
        })
        return { token, decoded };
    }


    async create(data: User): Promise<User | User[]> {
        return await this.userRepository.save(
            await this.userRepository.create(data)
        );
    }


    async find(): Promise<User[]> {
        return this.userRepository.find();
    }
    async login(name: string, pwd: string): Promise<Object> {
        const user = this.userRepository.findOne({ name, pwd });
        if (user) {
            const data = { id: (await user).id, name: (await user).name };
            const token = jwt.sign(data, this.secret, {
                expiresIn: 60 * 60 * 5  // 1小时过期
            });
            return { success: 200, data: { id: (await user).id, name: (await user).name, gender: (await user).gender, avatar: (await user).avatar, phone: (await user).phone,token:token } }
        } else {
            throw new HttpException("User doesn't exists", HttpStatus.BAD_REQUEST);
        }
    }
}
