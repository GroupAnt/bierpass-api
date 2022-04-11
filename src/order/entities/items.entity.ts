import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Order } from './order.entity';
import { CommonBaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Items extends CommonBaseEntity {
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
