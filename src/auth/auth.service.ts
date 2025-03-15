import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(loginDTO: LoginDTO): Promise<User> {
        return this.usersService.login(loginDTO);
    }
}
