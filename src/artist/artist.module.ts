import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { Artist } from './artist.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist, User])],
  controllers: [ArtistController],
  providers: [ArtistService]
})
export class ArtistModule {}
