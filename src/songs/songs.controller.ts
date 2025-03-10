import { Body, Controller, DefaultValuePipe, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Connection } from 'src/common/types/types';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Song } from './song.entity';
@Controller({path: 'songs', scope: Scope.REQUEST})
export class SongsController {
    constructor(private songsService: SongsService){}
    // constructor(
    //     private songsService: SongsService,
    //     @Inject('CONNECTION')
    //     private connection: Connection
    // ){
    //     console.log(`this is connection string ${this.connection.CONNECTION_STRING}`)
    // }
    @Post()
    create(@Body() createSongDTO: CreateSongDTO){
        return this.songsService.create(createSongDTO)
    }


    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe)
        page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe)
        limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit,
        }); 
    }    

    @Get(':id')
    findOne(
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_FOUND })) id: number,
    ) {
        return this.songsService.findOne(id);
    }
    


    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSongDTO: UpdateSongDTO
    ) : Promise<UpdateResult> {
        return this.songsService.update(id, updateSongDTO)
    }


    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe) id: number
    ) : Promise<DeleteResult> {
        return this.songsService.remove(id);
    }
}
