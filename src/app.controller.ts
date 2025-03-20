import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from './auth/jwt-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(
    @Req()
    request
  ){
    return request.user
  }

  @Post()
  postSomething(){
    return this.appService.postSomething('asd');
  }
  
}
