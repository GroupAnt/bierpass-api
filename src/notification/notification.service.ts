import { Injectable, Logger } from '@nestjs/common';
import { CreateNotificationMercadoPagoDto } from './dto/create-notification.dto';
import { Order, StatusEnumType } from '../order/entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MercadopagoService, PaymentStatus } from 'src/api/mercadopago/mercadopago.api';

@Injectable()
export class NotificationService {
  private readonly mercadopagoService: MercadopagoService
  private readonly logger = new Logger(NotificationService.name)

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {
    this.mercadopagoService = new MercadopagoService();
  }

  async createMercadoPago(createNotificationDto: CreateNotificationMercadoPagoDto) {
    const externalReferenceId = createNotificationDto.data.id;

    this.logger.log(`Received Payment Notification ${createNotificationDto.id} from ${externalReferenceId}`, createNotificationDto);

    const payment = await this.mercadopagoService.getPayment(externalReferenceId);
    const paymentStatus = PaymentStatus[payment.status];

    const data = {
      id: payment.orderId,
      status: paymentStatus as StatusEnumType,
      paymentDate: payment.approvedAt
    };

    const preload = await this.orderRepository.preload(data);

    await this.orderRepository.update(payment.orderId, preload);

    this.logger.log(`Updated ${externalReferenceId} to ${paymentStatus}`, preload);

    return preload;
  }
}
