import { httpClient } from "../httpClient";

export interface OrderParams {
  user_id: string;
  status: 'processing' | 'canceled' | 'finished';
  product: string;
  type_payment: string;
  price: number | string;
}

export async function create(params: OrderParams) {
  const { data } = await httpClient.post('/orders', params);

  return data;
}
