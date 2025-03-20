import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDTO {
    @IsString()
    @IsOptional()
    readonly title;

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artists;

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date;

    @IsMilitaryTime()
    @IsNotEmpty()
    readonly duration: Date;
    
    @IsString()
    @IsOptional( )
    readonly lyrics: boolean;
}