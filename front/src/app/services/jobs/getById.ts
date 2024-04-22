import { Jobs } from "@/app/entities/Jobs";
import { httpClient } from "../httpClient";

export interface JobsResponse {
  data: Jobs
}

export async function getById(id: string) {
  const { data } = await httpClient.get<JobsResponse>(`/jobs/${id}`);

  return data;
}
