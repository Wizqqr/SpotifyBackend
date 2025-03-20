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
import { User } from './users/users.entity';
import { Artist } from './artist/artist.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './common/constants/auth.constants';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './albums/album.entity';

const devConfig = { port: 3000};
const proConfig = { port: 400};
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        database: 'spotifynestjs01',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Aziret7bklass',
        entities: [Song, User, Artist, Album],
        synchronize: true,
      }
    ),
    SongsModule,
    AuthModule,
    UsersModule,
    JwtModule.register({secret: authConstants.secret}),
    AlbumsModule
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
    consumer.apply(LoggerMiddleware).forRoutes(SongsController)
    // consumer.apply(LoggerMiddleware).forRoutes(AuthController)

    consumer.apply(LoggerMiddleware).forRoutes({ path: 'auth', method: RequestMethod.GET})
  }
}
