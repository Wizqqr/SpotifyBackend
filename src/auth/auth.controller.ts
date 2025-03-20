import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/create-user-dto';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private usersService: UsersService,
                private authService: AuthService,
    ) {}

    @Post('signup')
    signup(@Body() userDTO: CreateUserDTO): Promise<User> {
        return this.usersService.create(userDTO);
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        console.log("Received Body:", loginDTO);
        return this.authService.login(loginDTO);
    }
}
