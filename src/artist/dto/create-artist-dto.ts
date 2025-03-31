import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  songIds: number[];
}