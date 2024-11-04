import { Order } from "@/app/entities/Order";
import { httpClient } from "../httpClient";

export interface PlansResponse {
  data: Order[]
}

export async function getAll() {
  const { data } = await httpClient.get<PlansResponse>('/orders');

  return data;
}
