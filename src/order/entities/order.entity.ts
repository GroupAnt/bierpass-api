import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Items } from './items.entity';
import { CommonBaseEntity } from 'src/common/entities/base.entity';

export enum StatusEnumType {
  PENDING = 'Pagamento Pendente',
  PAID = 'Pagamento Realizado',
  CANCELED = 'Pagamento Cancelado',
  COMPLETED = 'Completo'
}
export enum PaymentEnumType {
  PIX='Pix',
  CASH='Dinheiro',
}

@Entity()
export class Order extends CommonBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => Items, items => items.order)
  items: Items[];

  @Column()
  totalValue: number;

  @Column({ type: 'enum', enum: StatusEnumType, default: StatusEnumType.PENDING })
  status: StatusEnumType;

  @Column({ type: 'enum', enum: PaymentEnumType, default: PaymentEnumType.PIX })
  paymentMethod: PaymentEnumType;

  @Column({ nullable: true })
  paymentDate: Date;

  @Column({ default: 'NOW()' })
  createdAt: Date;
}
