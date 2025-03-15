import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user-dto';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService) {}

    @Post('signup')
    signup(@Body() userDTO: CreateUserDTO): Promise<User> {
        return this.usersService.create(userDTO);
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO): Promise<User> {
        console.log("Received Body:", loginDTO);
        return this.usersService.login(loginDTO);
    }
}
