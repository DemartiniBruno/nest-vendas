import { PartialType } from '@nestjs/mapped-types';
import { CreatePedidoDto } from './create-pedido.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from '../enum/status.enum';

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {
    
    @IsEnum(StatusEnum)
    @IsOptional()
    status:StatusEnum
}


// {
//     "user": {
//         "id": "7c75d95e-10fe-4f38-b45d-24f82dcbbf65",
//         "nome": "123456",
//         "email": "gio@teste.com",
//         "senha": "123456"
//     },
//     "status": "processando",
//     "valorTotal": 14,
//     "itensPedido": [
//         {
//             "product": "4daeacb1-ac36-49d9-ab24-4cb1fe4b3458",
//             "precoVenda": "7",
//             "quantidade": 1,
//             "id": "81c9bd72-9b35-40db-8e3a-71192ed3ef6f"
//         },
//         {
//             "product": "e34cf73c-0311-4403-accf-4c8e9f983764",
//             "precoVenda": "7",
//             "quantidade": 1,
//             "id": "cc557b2d-0ae7-4296-9984-798728a6104d"
//         }
//     ],
//     "id": "5a020aa3-5f77-46ac-b492-d14a4ab2460d"
// }