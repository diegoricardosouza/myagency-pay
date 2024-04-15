import { httpClient } from "../httpClient";

export interface PlanParams {
  name: string;
  updates: number;
  digital_midia: number;
  printed: number;
  presentations: number;
}

export async function create(params: PlanParams) {
  const { data } = await httpClient.post('/plans', params);

  return data;
}
