import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcrypt';

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
}
