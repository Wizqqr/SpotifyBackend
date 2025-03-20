import { Body, Controller, DefaultValuePipe, Get, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDTO } from './dto/create-album-dto';
import { Album } from './album.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

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
}
