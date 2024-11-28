import { Order } from "@/app/entities/Order";
import { httpClient } from "../httpClient";

export interface OrderResponse {
  data: Order;
}

export async function getByTransactionId(id: string) {
  const { data } = await httpClient.get<OrderResponse>(`/order-success/${id}`);

  return data;
}
