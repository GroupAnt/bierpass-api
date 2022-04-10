import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Items } from './entities/items.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Items) private readonly itemsRepository: Repository<Items>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {}

  async create(user: User, createOrderDto: CreateOrderDto) {
    const products = [];

    let totalValue = 0;
    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({ id: item.id });
      if (product) {
        const price = product.price / 100;
        totalValue += (price * item.quantity);

        const createOrderItem = this.itemsRepository.create({
          ...product,
          quantity: item.quantity
        })
        const orderItem = await this.itemsRepository.save(createOrderItem);

        products.push(orderItem);
      }
    }

    const order = this.orderRepository.create({
      items: products,
      user,
      totalValue: totalValue * 100
    });

    return this.orderRepository.save(order);
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
