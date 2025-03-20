import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from 'src/common/constants/auth.constants';
import { JwtStrategy } from './jwt-strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    UsersModule, 
    JwtModule.register({ 
      secret: authConstants.secret,
      signOptions: {
        expiresIn: '1d',
      }, 
    })],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
