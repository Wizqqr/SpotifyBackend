import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { CreateUserDTO } from './dto/create-user-dto';
import { LoginDTO } from '../auth/dto/login.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userDTO: CreateUserDTO): Promise<User> {
        const salt = await bcrypt.genSalt(2);
        userDTO.password = await bcrypt.hash(userDTO.password, salt);
        const user = await this.userRepository.save(userDTO);
        
        delete (user as any).password;

        return user;
    }



    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: data.email });
        if (!user) {
            throw new UnauthorizedException('Could not find the user');
        }
        return user;
    }

    async login(loginDTO: LoginDTO): Promise<User> {
        const user = await this.findOne({ email: loginDTO.email });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);
        if (!passwordMatched) {
            throw new UnauthorizedException('Password does not match');
        }else{
            console.log('success')
        }

        delete (user as any).password;
        return user;
    }
}
