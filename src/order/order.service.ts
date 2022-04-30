import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Items } from './entities/items.entity';
import { Product } from 'src/product/entities/product.entity';
import { MercadopagoService } from 'src/api/mercadopago/mercadopago.api';

@Injectable()
export class OrderService {
  private readonly mercadopagoService: MercadopagoService
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Items) private readonly itemsRepository: Repository<Items>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {
    this.mercadopagoService = new MercadopagoService();
  }

  async create(user: User, createOrderDto: CreateOrderDto) {
    const products = [];

    let totalValue = 0;
    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({ id: item.id });

      if (!product) {
        throw new NotFoundException(`Product ${item.id} not found`);
      }

      const price = product.price / 100;

      totalValue += price * item.quantity;

      const createOrderItem = this.itemsRepository.create({ product, quantity: item.quantity });
      const orderItem = await this.itemsRepository.save(createOrderItem);

      products.push(orderItem);
    }

    const order = this.orderRepository.create({
      items: products,
      user,
      totalValue: totalValue * 100
    });

    await this.orderRepository.save(order);

    order.totalValue = order.totalValue / 100;
    order.items.forEach(item => item.product.price = item.product.price / 100);

    const preferences = await this.mercadopagoService.createPayment(user, order);

    return {
      ...order,
      paymentUrl: preferences.init_point,
    };
  }

  async findAll(userId: string) {
    const orders = await this.orderRepository.find({
      relations: ['items'],
      where: {
        user: { id: userId }
      },
    });

    if (!orders.length) throw new NotFoundException();

    orders.forEach(order => order.totalValue = order.totalValue / 100);

    return orders;
  }

  async findOne(user: User, id: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id,
        user,
      },
    });

    if (!order) throw new NotFoundException();

    const items = await this.itemsRepository.find({
      relations: ['product'],
      where: {
        order: { id },
      },
    });

    order.totalValue = order.totalValue / 100;
    items.forEach(item => item.product.price = item.product.price / 100);

    return {
      ...order,
      items,
    };
  }

  async update(user: User, id: string, updateOrderDto: UpdateOrderDto) {
    if (!user.hasAdmin) {
      throw new ForbiddenException('You are not allowed to update orders');
    }

    const order = await this.orderRepository.findOne(id);

    if (!order) throw new NotFoundException({ message: 'Order not found' });

    const itemWhere = { where: { order: { id } }, relations: ['product'] };
    const items = await this.itemsRepository.find(itemWhere);

    for (const item of updateOrderDto.items) {
      if (item.quantity <= 0) {
        throw new BadRequestException({ message: 'Quantity must be greater than 0' });
      }

      const saved = items.find(i => i.product?.id === item.id);
      if (!saved) throw new NotFoundException({ message: `Item ${item.id} not found` });

      saved.quantity -= item.quantity || 1;

      if (saved.quantity < 0) {
        throw new BadRequestException({ message: `Item ${item.id} already received` });
      }

      const createOrderItem = this.itemsRepository.create(saved);
      
      await this.itemsRepository.save(createOrderItem);
    }

    const updatedOrder = await this.orderRepository.findOne(id, { relations: ['items'] });

    updatedOrder.totalValue = updatedOrder.totalValue / 100;

    updatedOrder.items.forEach(item => item.product.price = item.product.price / 100);

    return updatedOrder;
  }
}