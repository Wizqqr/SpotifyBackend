import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { CreateAlbumDTO } from './dto/create-album-dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
        @InjectRepository(Song)
        private songRepository: Repository<Song>
    ) {}

    async create(albumDTO: CreateAlbumDTO): Promise<Album> {
        const album = new Album();
        album.title = albumDTO.title;

        // Загружаем все указанные песни по id
        if (albumDTO.songs && albumDTO.songs.length) {
            const songs = await this.songRepository.findByIds(albumDTO.songs);
            album.songs = songs;
        }

        return this.albumRepository.save(album);
    }

    async findAll(): Promise<Album[]> {
        const albums = await this.albumRepository.find({ relations: ['songs'] });
        if (!albums.length) {
            throw new Error('404: Albums not found');
        }
        return albums;
    }

    async findById(id: number): Promise<Album> {
        const album = await this.albumRepository.findOne({ 
            where: { id },
            relations: ['songs'], // Загружаем связанные песни
        });

        if (!album) {
            throw new Error('404: Album not found');
        }

        return album;
    }

    async paginate(options: IPaginationOptions): Promise<Pagination<Album>> {
        const queryBuilder = this.albumRepository.createQueryBuilder('album');
        queryBuilder.leftJoinAndSelect('album.songs', 'song'); // Загружаем песни
        queryBuilder.orderBy('album.title', 'DESC');

        return paginate<Album>(queryBuilder, options);
    }
}