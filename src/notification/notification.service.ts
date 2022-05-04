import { Injectable } from '@nestjs/common';
import { CreateNotificationMercadoPagoDto } from './dto/create-notification.dto';
import { Order, StatusEnumType } from '../order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercadopagoService, PaymentStatus } from 'src/api/mercadopago/mercadopago.api';

@Injectable()
export class NotificationService {
  private readonly mercadopagoService: MercadopagoService
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {
    this.mercadopagoService = new MercadopagoService();
  }

  async createMercadoPago(createNotificationDto: CreateNotificationMercadoPagoDto) {
    const externalReferenceId = createNotificationDto.data.id;

    const payment = await this.mercadopagoService.getPayment(externalReferenceId);
    const paymentStatus = PaymentStatus[payment.status];

    const preload = await this.orderRepository.preload({ id: payment.orderId, status: paymentStatus as StatusEnumType, paymentDate: payment.approvedAt });

    await this.orderRepository.update(payment.orderId, preload);

    return preload;
  }
}
