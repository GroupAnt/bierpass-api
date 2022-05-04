import { User } from "src/user/entities/user.entity";
import { Order, StatusEnumType } from "src/order/entities/order.entity";
import { MercadopagoModel } from "./mercadopago.model";

const mercadopago = require('mercadopago');

export enum PaymentStatus {
  approved = StatusEnumType.PAID,
  authorized = StatusEnumType.PAID,
  in_process = StatusEnumType.PENDING,
  pending = StatusEnumType.PENDING,
  cancelled = StatusEnumType.CANCELED,
  charged_back = StatusEnumType.CHARGEBACK,
  refunded = StatusEnumType.CHARGEBACK,
  rejected = StatusEnumType.CANCELED,
}

export class MercadopagoService {
  constructor() {
    mercadopago.configurations.setAccessToken(process.env.MERCADOPAGO_ACCESS_TOKEN);
  }

  async getPayment(id: string): Promise<any> {
    const { response } = await mercadopago.payment.get(id);

    return {
      status: response.status,
      orderId: response.external_reference, 
      approvedAt: response.date_approved
    };
  }

  async createPayment(user: User, order: Order): Promise<any> {
    const model = new MercadopagoModel(user, order);

    const preferences = await mercadopago.preferences.create(model.mapToRequest());
    return preferences.response;
  }
}