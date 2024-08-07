import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [DatabaseModule, UserModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
