import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  minQuantity: number;
}
