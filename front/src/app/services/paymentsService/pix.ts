import { httpClient } from "../httpClient";

export interface PixParams {
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
  }
}

export async function pix(params: PixParams) {
  const { data } = await httpClient.post('/payment/pix', params);

  return data;
}
