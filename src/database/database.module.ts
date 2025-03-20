import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/albums/album.entity';

@Module({
  imports: [TypeOrmModule.forRoot(
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
  )],  
  providers: [DatabaseService],
  controllers: [DatabaseController]
})
export class DatabaseModule {}
