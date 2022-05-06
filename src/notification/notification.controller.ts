import { Controller, Post, Body, Logger } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationMercadoPagoDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  private readonly logger = new Logger(NotificationService.name)

  constructor(private readonly notificationService: NotificationService) {}

  @Post('/payment/mercadopago')
  async createPayment(@Body() createNotificationDto: CreateNotificationMercadoPagoDto) {
    try {
      return await this.notificationService.createMercadoPago(createNotificationDto);
    } catch(error) {
      this.logger.warn(`Payment Notification Error - ${error}`, createNotificationDto);

      throw error;
    }
  }
}
