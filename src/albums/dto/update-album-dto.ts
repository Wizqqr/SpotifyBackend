import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateAlbumDTO{
    @IsString()
    @IsNotEmpty()
    readonly title;

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly songs;
}