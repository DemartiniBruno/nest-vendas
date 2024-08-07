import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty({message:'O nome deve ser preenchido'})
    nome:string;

    @IsEmail(undefined,{message:'Email inválido'})
    email:string;

    @MinLength(6,{message:'A senha deve ter pelo menos 6 caracteres'})
    senha:string;
}
