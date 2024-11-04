import { httpClient } from "../httpClient";

export interface UpdateOrderParams {
  id: string;
  status: 'processing' | 'canceled' | 'finished';
}

export async function update({ id, ...params }: UpdateOrderParams) {
  const { data } = await httpClient.patch(`/orders/${id}`, params);

  return data;
}
