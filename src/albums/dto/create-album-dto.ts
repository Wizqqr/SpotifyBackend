import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAlbumDTO{
    @IsString()
    @IsNotEmpty()
    readonly title;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly songs;
}