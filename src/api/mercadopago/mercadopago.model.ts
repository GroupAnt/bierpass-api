export class MercadopagoModel {
  private readonly user;
  private readonly order;

  constructor(user, order) {
    this.user = user;
    this.order = order;
  }

  private mapUser() {
    const user = this.user;

    const [ areaCode, phoneNumber ] = user.phone.split(' ');

    return {
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
        federal_unit: user.country,
      },
      identification: {
        type: 'CPF',
        number: user.federalTaxId
      },
    }
  }

  private mapItems() {
    const items = this.order.items;

    return items.map(item => {
      return {
        id: item.product.id,
        title: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price
      }
    });
  }

  private mapExternalReference() {
    return this.order.id;
  }

  mapToRequest() {
    const user = this.mapUser();

    return {
      transaction_amount: this.order.totalValue,
      external_reference: this.mapExternalReference(),
      payer: user,
      items: this.mapItems(),
      back_urls: {
        success: 'https://webhook.site/06b0ba65-18df-42b6-8ddf-066a5d09a9ee'
      }
    }
  }
}