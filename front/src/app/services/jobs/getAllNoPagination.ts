import { Jobs } from "@/app/entities/Jobs";
import { httpClient } from "../httpClient";

export interface JobsResponse {
  data: Jobs[]
}

export async function getAllNoPagination(startDate?: string | null | undefined, endDate?: string | null | undefined) {
  const { data } = await httpClient.get<JobsResponse>('/jobs-all', {
    params: {
      startDate: startDate,
      endDate: endDate
    }
  });

  return data;
}
