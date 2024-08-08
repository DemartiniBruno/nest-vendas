import { IsArray, IsEnum, IsNumber, IsUUID } from "class-validator";
import { StatusEnum } from "../enum/status.enum";

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




// Pedido {
//     id: '7cd170fa-4004-4401-a64e-a4b542725a54',
//     valorTotal: '10',
//     status: 'processando',
//     itensPedido: [
//       ItensPedido {
//         id: 'b4c943e3-a633-4aae-a6ab-a0109fa04fe4',
//         quantidade: '5',
//         precoVenda: '1'
//       },
//       ItensPedido {
//         id: '5b82e02e-dfcc-43ea-aa48-b0f038ac64a8',
//         quantidade: '1',
//         precoVenda: '5'
//       }
//     ]
//   }