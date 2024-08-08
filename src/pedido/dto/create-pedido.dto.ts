import { IsEnum, IsNumber, IsUUID } from "class-validator";
import { StatusEnum } from "../enum/status.enum";

export class CreatePedidoDto {

    @IsUUID()
    productId:string;

    @IsNumber()
    quantidade:number;

    @IsNumber()
    precoVenda:number
}
