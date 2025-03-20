import { Body, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dto/create-album-dto';
import { Album } from './album.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateSongDTO } from 'src/songs/dto/update-song-dto';
import { UpdateAlbumDTO } from './dto/update-album-dto';
import { UpdateResult } from 'typeorm';

@Controller('albums')
export class AlbumsController {
    constructor(
        private albumService: AlbumsService){}

    @Post()
    create(@Body() createAlbumDTO: CreateAlbumDTO){
        return this.albumService.create(createAlbumDTO)
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10,
    ): Promise<Pagination<Album>> {
        limit = limit > 100 ? 100 : limit;
        return this.albumService.paginate({
            page,
            limit,
        }); 
    }    

    @Get(':id')
    findById(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND })) id: number,
){
    return this.albumService.findById(id)}

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateAlbumDTO: UpdateAlbumDTO
    ): Promise<Album> {
        return this.albumService.update(id, updateAlbumDTO);
    }
    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ): Promise<{ message: string }> {
        await this.albumService.delete(id);
        return { message: 'Album deleted successfully' };
    }
    

        // @Put(':id')
        // update(
        //     @Param('id', ParseIntPipe) id: number,
        //     @Body() updateSongDTO: UpdateSongDTO
        // ) : Promise<UpdateResult> {
        //     return this.songsService.update(id, updateSongDTO)
        // }
    
    
        // @Delete(':id')
        // delete(
        //     @Param('id', ParseIntPipe) id: number
        // ) : Promise<DeleteResult> {
        //     return this.songsService.remove(id);
        // }
}
