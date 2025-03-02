import { Injectable, Scope } from '@nestjs/common';

@Injectable({
    scope: Scope.TRANSIENT,
})
export class SongsService {
    // local db 
    // local array

    private readonly songs: any[] = [];

    create(song){
        // Save the song in the db
        this.songs.push(song);
        return this.songs;
    }
    findAll() {
        // fetch the songs from the db
        // errors comes while fetching the data from db
        throw new Error('Error in DB while fetching record')
        return this.songs
    }
}
