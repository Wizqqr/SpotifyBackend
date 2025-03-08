import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG')
    private config: { port: string},
  ){}
  getHello(): string {
    return `Hello my name is Aziret ${this.devConfigService.getDBHOST()} PORT = ${this.config.port}`;
  }
  private readonly users: any[] = [];

  postSomething(user){
    this.users.push(user)
    return this.users
  }
}
