import { Jobs } from "@/app/entities/Jobs";
import { IPaginateResponse } from "@/app/entities/Pagination";
import { httpClient } from "../httpClient";

export interface JobsResponse {
  data: Jobs[]
}

export async function getAll(page = 1, perPage = 6, startDate?: string | null | undefined, endDate?: string | null | undefined) {
  const { data } = await httpClient.get<IPaginateResponse<Jobs[]>>('/jobs', {
    params: {
      page,
      per_page: perPage,
      startDate: startDate,
      endDate: endDate
    }
  });

  return data;
}
