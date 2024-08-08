import { DataSource } from "typeorm";
import { ItensPedido } from "../entities/itens-pedido.entity";

export const itemPedidoProviders = [
    {
        provide: 'ITEM_PEDIDO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(ItensPedido),
        inject: ['DATA_SOURCE'],
    }
]