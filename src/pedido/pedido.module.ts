import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { UserService } from 'src/user/user.service';
import { userProviders } from 'src/user/providers/user.provider';
import { DatabaseModule } from 'src/database/database.module';
import { pedidoProviders } from './providers/pedido.providers';
import { itemPedidoProviders } from './providers/item-pedido.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [PedidoController],
  providers: [
    PedidoService,
    ...pedidoProviders,
    ...itemPedidoProviders,
    UserService,
    ...userProviders
    ],
})
export class PedidoModule {}
