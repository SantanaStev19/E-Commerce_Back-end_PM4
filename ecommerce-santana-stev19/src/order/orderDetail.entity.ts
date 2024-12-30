import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Products } from './../products/products.entity';
import { Orders } from './order.entity';

@Entity({
  name: 'order_details',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToMany(() => Products)
  @JoinTable({
    name: 'order_details_products',
  })
  products: Products[];

  @OneToOne(() => Orders, (order) => order.orderDetail)
  @JoinColumn({
    name: 'order_id',
  })
  order: Orders;
}
