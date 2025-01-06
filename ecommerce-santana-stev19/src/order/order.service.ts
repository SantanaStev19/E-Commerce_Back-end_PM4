import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './order.entity';
import { OrderDetail } from './orderDetail.entity';
import { Products } from '../products/products.entity';
import { User } from '../users/user.entity';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async addOrder(createOrderDto: CreateOrderDto) {
    try {
      const { userId, products } = createOrderDto;

      // Verificar usuario
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      // Verificar productos
      const productIds = products.map((p) => p.id);
      const foundProducts = await this.productsRepository.findByIds(productIds);

      if (foundProducts.length !== productIds.length) {
        const notFoundIds = productIds.filter(
          (id) => !foundProducts.some((product) => product.id === id),
        );
        throw new BadRequestException(
          `Los siguientes productos no existen: ${notFoundIds.join(', ')}`,
        );
      }

      // Verificar stock
      const outOfStock = foundProducts.filter((p) => p.stock <= 0);
      if (outOfStock.length) {
        throw new BadRequestException(
          `Los siguientes productos no tienen stock: ${outOfStock
            .map((p) => p.name)
            .join(', ')}`,
        );
      }

      // Calcular precio total
      const totalPrice = foundProducts.reduce((sum, p) => sum + p.price, 0);

      // Reducir stock de los productos
      for (const product of foundProducts) {
        product.stock -= 1;
        await this.productsRepository.save(product);
      }

      // Crear detalle de la orden
      const orderDetail = this.orderDetailRepository.create({
        price: totalPrice,
        products: foundProducts,
      });
      const savedOrderDetail =
        await this.orderDetailRepository.save(orderDetail);

      // Crear orden
      const order = this.ordersRepository.create({
        date: new Date(),
        user,
        orderDetail: savedOrderDetail,
      });
      const savedOrder = await this.ordersRepository.save(order);

      return {
        orderId: savedOrder.id,
        totalPrice: savedOrderDetail.price,
        products: foundProducts.map((p) => ({ id: p.id, name: p.name })),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al crear la orden de compra',
        error.message,
      );
    }
  }

  async getOrder(id: string) {
    try {
      const order = await this.ordersRepository.findOne({
        where: { id },
        relations: ['user', 'orderDetail', 'orderDetail.products'],
      });

      if (!order) {
        throw new NotFoundException('Orden no encontrada');
      }

      return {
        orderId: order.id,
        date: order.date,
        user: {
          id: order.user.id,
          name: order.user.name,
          email: order.user.email,
        },
        totalPrice: order.orderDetail.price,
        products: order.orderDetail.products.map((p) => ({
          id: p.id,
          name: p.name,
        })),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la orden de compra',
        error.message,
      );
    }
  }
}
