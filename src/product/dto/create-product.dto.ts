import { Min } from 'class-validator';

export class CreateProductDto {
  name: string;
  @Min(1) price: number;
  @Min(1) minQuantity: number;
}
