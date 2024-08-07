import { IsEmail, IsNotEmpty, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    nome:string;

    @IsEmail()
    email:string;

    @MinLength(6)
    senha:string;
}