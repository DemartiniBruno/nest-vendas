import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @IsOptional()
    @IsNotEmpty({message:'O nome preenchido é inválido'})
    nome:string;

    @IsOptional()
    @IsEmail(undefined, {message:'Email inválido'})
    email:string;

    @IsOptional()
    @MinLength(6,{message:'A senha deve ter pelo menos 6 caracteres'})
    senha:string;
}
