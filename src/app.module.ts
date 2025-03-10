import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './common/providers/DevConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';

const devConfig = { port: 3000};
const proConfig = { port: 400};
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        database: 'spotifyNestjs',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Aziret7bklass',
        entities: [Song],
        synchronize: true,
      }
    ),
    SongsModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
    provide: DevConfigService,
    useClass: DevConfigService,
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : proConfig;
      }
    }
    
 ],
})
export class AppModule implements NestModule{
  constructor(private dataSource: DataSource){
    console.log('dbname', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs') //option num 1
    // consumer.apply(LoggerMiddleware).forRoutes({path: 'songs', method: RequestMethod.POST}) // option num 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
  }
}
