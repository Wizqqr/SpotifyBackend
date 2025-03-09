import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Connection } from 'src/common/types/types';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDTO } from './dto/update-song-dto';
import { DeleteResult, UpdateResult } from 'typeorm';
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
    findAll() {
        try{
            return this.songsService.findAll();
        }
        catch(err){
            throw new HttpException('server error', HttpStatus.NOT_FOUND, {
                cause: err
            })
        }
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
