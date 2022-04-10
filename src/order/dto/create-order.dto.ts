import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateItemDto {
  id: string;
  quantity: number;
}

export class CreateOrderDto {
  paymentMethod: string;
  items: CreateItemDto[];
  user: CreateUserDto
}
