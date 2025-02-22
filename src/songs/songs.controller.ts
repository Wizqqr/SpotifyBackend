import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('songs')
export class SongsController {
    @Get()
    findAll() {
        return 'find all songs endpoint'
    }    
    @Get(':id')
    findOne() {
        return 'find song by id endpoint'
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
    create() {
        return 'create a song by id endpoint'
    }
}
