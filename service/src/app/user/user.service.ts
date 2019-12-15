import { Injectable } from '@nestjs/common';
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


    async create(): Promise<string> {
        const employee = new User();
        return this.userRepository.save(employee)
            .then(res => {
                return 'create employee ...done';
            })
            .catch(err => {
                return err;
            });
    }

    async find(): Promise<User[]> {
        // return await this.employeeRepository.findOne({ name });
        return this.userRepository.find();
    }
    async findOne(name: string): Promise<User> {
        // return await this.employeeRepository.findOne({ name });
        return this.userRepository.findOne({ name });
    }
}
