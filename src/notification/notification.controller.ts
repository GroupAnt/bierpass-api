import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationMercadoPagoDto } from './dto/create-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/payment/mercadopago')
  createPayment(@Body() createNotificationDto: CreateNotificationMercadoPagoDto) {
    return this.notificationService.createMercadoPago(createNotificationDto);
  }
}
