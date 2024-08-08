import { IsArray, IsEnum, IsNumber, IsUUID } from "class-validator";

export class CreatePedidoDto {
    @IsArray()
    itensPedido: itemPedidoDto[]
}

class itemPedidoDto {
    @IsUUID()
    productId:string;

    @IsNumber()
    quantidade:number;
}