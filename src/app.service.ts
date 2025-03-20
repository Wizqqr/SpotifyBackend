import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    private dbService: DatabaseService,
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
