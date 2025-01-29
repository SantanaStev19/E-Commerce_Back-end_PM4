import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({ path: '.env' });

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/*.migrations{.ts,.js}'],
  autoLoadEntities: true,
  dropSchema: true,
  logging: true,
  synchronize: true,
};

export const connectionSource = new DataSource(
  typeOrmConfig as DataSourceOptions,
);
