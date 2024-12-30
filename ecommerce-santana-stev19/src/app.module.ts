import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typyOrm.config';
import { CategoriesModule } from './categories/categories.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    ProductsModule,
    AuthModule,
    CategoriesModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
