import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Items } from './entities/items.entity';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Items, Product])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
