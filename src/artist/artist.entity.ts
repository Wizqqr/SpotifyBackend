import { Song } from "src/songs/song.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(()=> User)
    @JoinColumn()
    user: User

    @ManyToMany(() => Song, (song) => song.artists)
    songs: Song[]

    

}