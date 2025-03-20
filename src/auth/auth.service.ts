import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.entity';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
                private jwtService: JwtService,
    ) {}

    // async validateUser(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    //     return this.usersService.login(loginDTO);
    // }
    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOne({ email: loginDTO.email });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
    
        const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);
        if (!passwordMatched) {
            throw new UnauthorizedException('Invalid credentials');
        }
    
        const payload = { email: user.email, sub: user.id };
        return { accessToken: this.jwtService.sign(payload) };
    }
        
}
