import 'dotenv/config';
import { User } from '../user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { Pedido } from '../pedido/entities/pedido.entity';
import { ItensPedido } from '../pedido/entities/itens-pedido.entity';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Product, Pedido, ItensPedido],
  migrations: [__dirname + '/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
