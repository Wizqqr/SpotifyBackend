import { Artist } from "src/artist/artist.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column('date')
    releasedDate: Date

    @Column('time')
    duration: Date;

    @Column('text')
    lyrics: string;

    @ManyToMany(() => Artist, (artist) => artist.songs, {cascade: true})
    @JoinTable({name: 'songs_artists'})
    artists: Artist[];
}