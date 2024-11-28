import { httpClient } from "../httpClient";

export interface CreditCardParams {
  items: {
    code: string;
    amount: number;
    description: string;
    quantity: string;
  }[];
  customer: {
    name: string;
    email: string;
    document: string;
    type: string;
    phones: {
      mobile_phone: {
        country_code: string;
        area_code: string;
        number: string;
      }
    }
  };
  payments: {
    payment_method: string;
    credit_card: {
      recurrence_cycle: string;
      installments: number;
      statement_descriptor: string;
      card: {
        number: string;
        holder_name: string;
        exp_month: number;
        exp_year: number;
        cvv: string;
        billing_address: {
          line_1: string;
          zip_code: string;
          city: string;
          state: string;
          country: string;
        },
      },
    },
  }[]
}

export async function creditCard(params: CreditCardParams) {
  const { data } = await httpClient.post('/payment/credit-card', params);

  return data;
}
