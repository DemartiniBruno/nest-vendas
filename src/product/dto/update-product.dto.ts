import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, MaxLength, MinLength } from "class-validator"
import { CategoriaEnum } from '../enum/categoria.enum';


export class UpdateProductDto extends PartialType(CreateProductDto) {
    
    @IsOptional()
    @IsNotEmpty()
    nome:string

    @IsOptional()
    @MinLength(7)
    @MaxLength(13)
    gtin:string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    valor:number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    quantidadeDisponivel:number
    
    @IsOptional()
    descricao:string

    @IsOptional()
    @IsEnum(CategoriaEnum)
    categoria:CategoriaEnum
}
