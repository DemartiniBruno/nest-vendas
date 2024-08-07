import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength, MinLength, minLength } from "class-validator"
import { CategoriaEnum } from "../enum/categoria.enum"

export class CreateProductDto {

    @IsNotEmpty()
    nome:string

    @MinLength(7)
    @MaxLength(13)
    gtin:string

    @IsNumber()
    @IsPositive()
    valor:number

    @IsNumber()
    @IsPositive()
    quantidadeDisponivel:number
    
    @IsOptional()
    descricao:string

    @IsEnum(CategoriaEnum)
    categoria:CategoriaEnum
}
