import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Items } from './items.entity';
import { CommonBaseEntity } from 'src/common/entities/base.entity';

export enum StatusEnumType {
  PENDING = 'Pagamento Pendente',
  PAID = 'Pagamento Aprovado',
  CANCELED = 'Pagamento Cancelado',
  CHARGEBACK = 'Pagamento Devolvido',
  COMPLETED = 'Completo'
}

@Entity()
export class Order extends CommonBaseEntity {
  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => Items, items => items.order)
  items: Items[];

  @Column({ default: 0, type: 'real' })
  totalValue: number;

  @Column({ type: 'enum', enum: StatusEnumType, default: StatusEnumType.PENDING })
  status: StatusEnumType;

  @Column({ nullable: true })
  paymentDate: Date;
}
