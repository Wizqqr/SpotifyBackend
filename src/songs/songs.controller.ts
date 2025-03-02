import { Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService){}
    @Post()
    create(){
        return this.songsService.create
        ('Animals by Me22');
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
