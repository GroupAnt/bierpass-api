import { IsNumberString, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  name: string;
  @Min(1) price: number;
  minQuantity: number;
}
