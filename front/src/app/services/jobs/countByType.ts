import { Jobs } from "@/app/entities/Jobs";
import { httpClient } from "../httpClient";

export interface JobsResponse {
  data: Jobs[]
}

export async function countByType(type?: string | null | undefined) {
  const { data } = await httpClient.get<number>('/jobs-count', {
    params: {
      type
    }
  });

  return data;
}
