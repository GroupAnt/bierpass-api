import { User } from "src/user/entities/user.entity";
import { Order } from "src/order/entities/order.entity";

const mercadopago = require('mercadopago');

export class MercadopagoService {
  public async createPayment(user: User, order: Order): Promise<any> {
    mercadopago.configure({ access_token: process.env.MERCADOPAGO_ACCESS_TOKEN });

    const items = order.items.map(item => {
      return {
        id: item.product.id,
        title: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price
      }
    });

    const [ areaCode, phoneNumber ] = user.phone.split(" ");
    const payer = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone: {
        area_code: areaCode,
        number: Number(phoneNumber)
      },
      address: {
        zip_code: user.postalCode,
        street_name: user.streetName,
        street_number: Number(user.streetNumber),
        neighborhood: user.neighborhood,
        city: user.city,
        federal_unit: 'SC',
      },
      identification: {
        type: 'CPF',
        number: user.federalTaxId
      },
      external_reference: order.id,
    }

    const paymentModel = {
      transaction_amount: order.totalValue,
      payer,
      items,
      payment_method_id: 'pix',
      installments: 1
    };

    const preferences = await mercadopago.preferences.create(paymentModel);

    return preferences.response;
  }
}