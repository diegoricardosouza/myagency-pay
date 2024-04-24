import { Jobs } from "@/app/entities/Jobs";
import { httpClient } from "../httpClient";

export interface JobsResponse {
  data: Jobs[]
}

export async function getAllNoPagination() {
  const { data } = await httpClient.get<JobsResponse>('/jobs-all');

  return data;
}
