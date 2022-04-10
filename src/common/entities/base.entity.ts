import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";

export class CommonBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
}