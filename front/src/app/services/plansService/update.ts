import { httpClient } from "../httpClient";

export interface UpdatePlanParams {
  id: string;
  name: string;
  updates: string;
  digital_midia: string;
  printed: string;
  presentations: string;
}

export async function update({ id, ...params }: UpdatePlanParams) {
  const { data } = await httpClient.patch(`/plans/${id}`, params);

  return data;
}
