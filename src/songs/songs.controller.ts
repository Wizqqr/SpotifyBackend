import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Scope } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Connection } from 'src/common/types/types';
import { CreateSongDTO } from './dto/create-song-dto';
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
        @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE}),
    )
    id: Number,
    ) {
        return `fetch song on the based on id ${typeof id}`
    }


    @Put(':id')
    update() {
        return 'change song by id endpoint'
    }


    @Delete(':id')
    delete() {
        return 'delete song by id endpoint'
    }


    @Post()
    createSong() {
        return 'create a song by id endpoint'
    }
}
