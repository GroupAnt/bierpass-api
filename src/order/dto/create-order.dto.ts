import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateOrderDto {
  paymentMethod: string;
  items: string[];
  user: CreateUserDto
}
