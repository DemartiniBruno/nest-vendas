import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule, PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
