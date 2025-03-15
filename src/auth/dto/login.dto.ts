import { IsEmail,  IsNotEmpty, isNotEmpty, IsString, isString } from "class-validator";

export class LoginDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}