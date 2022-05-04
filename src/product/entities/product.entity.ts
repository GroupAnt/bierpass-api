import { CommonBaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';


@Entity()
export class Product extends CommonBaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ default: 0, type: 'real' })
  price: number;

  @Column({ nullable: false, default: 0 })
  minQuantity: number;
}
