import { IsEnum, IsNumber } from "class-validator";
import { StatusEnum } from "../enum/status.enum";

export class CreatePedidoDto {

    @IsNumber()
    valorTotal:number;

    @IsEnum(StatusEnum)
    status:string;
}
