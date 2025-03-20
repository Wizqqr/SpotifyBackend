import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { Album } from './album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Album])],
  providers: [AlbumsService],
  controllers: [AlbumsController]
})
export class AlbumsModule {}
