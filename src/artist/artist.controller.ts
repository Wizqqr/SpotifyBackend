import { Body, Controller, DefaultValuePipe, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistController {
    constructor(
        private artistsService: ArtistService
    ){}

    @Post()
    create(@Body() createArtistDTO: CreateArtistDto){
        return this.artistsService.create(createArtistDTO)
    }

      @Get()
      findAll(
          @Query('page', new DefaultValuePipe(1), ParseIntPipe)
          page: number = 1,
          @Query('limit', new DefaultValuePipe(5), ParseIntPipe)
          limit: number = 5
      ): Promise<Pagination<Artist>> {
          limit = limit > 100 ? 100 : limit;
          return this.artistsService.paginate({
              page,
              limit,
          }); 
      }    
  

}
