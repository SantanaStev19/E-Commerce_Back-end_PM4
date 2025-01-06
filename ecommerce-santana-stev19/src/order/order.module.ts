import { Module } from '@nestjs/common';
import { OrdersService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './order.entity';
import { OrderDetail } from './orderDetail.entity';
import { Products } from 'src/products/products.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetail, Products, User])],
  controllers: [OrderController],
  providers: [OrdersService],
})
export class OrderModule {}
