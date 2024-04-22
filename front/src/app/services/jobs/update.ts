import { httpClient } from "../httpClient";

export interface UpdateJobParams {
  id: string;
  status: string;
}

export async function update({ id, ...params }: UpdateJobParams) {
  const { data } = await httpClient.patch(`/jobs/${id}`, params);

  return data;
}
