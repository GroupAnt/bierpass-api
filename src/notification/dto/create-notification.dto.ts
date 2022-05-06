export class CreateNotificationDto {}

export class CreateNotificationMercadoPagoDto {
  id: number;
  type: string;
  data: { id: string; }
}