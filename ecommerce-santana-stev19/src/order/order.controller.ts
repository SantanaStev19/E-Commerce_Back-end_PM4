import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.addOrder(createOrderDto);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
