import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { Repository, In } from 'typeorm';
import { CreateArtistDto } from './dto/create-artist-dto';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/users.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>,
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async create(artistDTO: CreateArtistDto): Promise<Artist>{
        const artist = new Artist();
        artist.name = artistDTO.name;

        const user = await this.userRepository.findOne({ where: { id: artistDTO.userId } });
        if (!user) {
            throw new Error('User not found');
        }
        artist.user = user;

        if (artistDTO.songIds && artistDTO.songIds.length > 0) {
            const songs = await this.songRepository.findBy({ id: In(artistDTO.songIds) });
            artist.songs = songs;
        }

        return this.artistRepository.save(artist);
    }

    async findAll(): Promise<Artist[]>{
        const artists = await this.artistRepository.find()
        if(!artists){
            throw new Error('Artists not found')
        }

        return artists
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Artist>>{
        const queryBuilder = this.artistRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.name', 'DESC');



        return paginate<Artist>(queryBuilder, options);
    }
}
