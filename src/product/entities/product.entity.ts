import { CommonBaseEntity } from 'src/common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Product extends CommonBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  minQuantity: number;
}
