import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Items } from './entities/items.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Items) private readonly itemsRepository: Repository<Items>,
  ) {}

  async create(user: User, createOrderDto: CreateOrderDto) {
    const products = [];
    return products;
  }

  findAll(userId: string) {
    return this.orderRepository.find({
      relations: ['items'],
      where: {
        user: { id: userId }
      },
    });
  }

  findOne(user: User, id: string) {
    return this.orderRepository.findOne({
      where: {
        id,
        user,
      },
    });
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
