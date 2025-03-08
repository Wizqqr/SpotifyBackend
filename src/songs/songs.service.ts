import { Injectable, Scope } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
    constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>){}

    create(songDTO: CreateSongDTO) : Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;



        return this.songsRepository.save(song);
    }
    findAll() {
        
    }
}
