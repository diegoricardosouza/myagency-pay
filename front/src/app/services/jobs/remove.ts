import { httpClient } from "../httpClient";


export async function remove(jobId: string) {
  const { data } = await httpClient.delete(`/jobs/${jobId}`);

  return data;
}
