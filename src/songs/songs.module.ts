import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Artist } from 'src/artist/artist.entity';
import { Album } from 'src/albums/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist, Album])],
  controllers: [SongsController],
  providers: [SongsService],
  // controllers: [SongsController],
  // providers: [
  //   SongsService,
  //   {
  //     provide: 'CONNECTION',
  //     useValue: connection
  //   }
  // ]
})
export class SongsModule {}
