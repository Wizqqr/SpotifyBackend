import { Song } from "src/songs/song.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('albums')
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(() => Song, (song) => song.albums, {cascade:true})
    songs: Song[];
}
