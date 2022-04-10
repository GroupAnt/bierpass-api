import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class Items extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Order, order => order.id)
  @JoinColumn()
  order: Order;

  @Column()
  quantity: number;
}
