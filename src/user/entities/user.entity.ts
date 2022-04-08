import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ default: 'Blumenau'})
  city: string;

  @Column({ default: 'SC' })
  country: string;
}
