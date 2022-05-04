import { CreateProductDto } from "src/product/dto/create-product.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateItemDto {
  id: string;
  quantity: number;
  product: CreateProductDto
}

export class CreateOrderDto {
  paymentMethod: string;
  items: CreateItemDto[];
  user: CreateUserDto;
}
