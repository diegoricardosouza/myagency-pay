import { Order } from "@/app/entities/Order";
import { httpClient } from "../httpClient";

export interface OrderResponse {
  data: Order;
}

export async function getById(id: string) {
  const { data } = await httpClient.get<OrderResponse>(`/orders/${id}`);

  return data;
}
