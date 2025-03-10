import { Injectable, Scope } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class SongsService {
    constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>){}

    async create(songDTO: CreateSongDTO) : Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;



        return this.songsRepository.save(song);
    }

    async findAll() : Promise<Song[]> {
        const songs = await this.songsRepository.find();
        if(!songs){
            throw new Error(`Songs not found`)
        }
        return songs
    }

    async findOne(id: number): Promise<Song> {
        const song = await this.songsRepository.findOneBy({ id });
        if (!song) {
            throw new Error(`Song with ID ${id} not found`);
        }
        return song;
    }

    async remove(id: number) : Promise<DeleteResult> {
        return this.songsRepository.delete(id)
    }
    
    async update(id:number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
        return this.songsRepository.update(id, recordToUpdate)
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Song>>{
        const queryBuilder = this.songsRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');



        return paginate<Song>(queryBuilder, options);
    }
}
