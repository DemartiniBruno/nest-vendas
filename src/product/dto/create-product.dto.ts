import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator"
import { CategoriaEnum } from "../enum/categoria.enum"

export class CreateProductDto {

    @IsNotEmpty()
    nome:string

    @IsNotEmpty()
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
