import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { CommonBaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class User extends CommonBaseEntity {
  @Column({ nullable: false, unique: true })
  federalTaxId: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  phone: string;

  @Column({ default: false, nullable: false })
  hasAdmin: boolean;

  @Column({ nullable: false })
  streetName: string;

  @Column({ nullable: false })
  streetNumber: string;

  @Column({ nullable: false })
  neighborhood: string;

  @Column({ nullable: false })
  postalCode: string;

  @Column({ default: 'Blumenau' })
  city: string;

  @Column({ default: 'SC' })
  country: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
