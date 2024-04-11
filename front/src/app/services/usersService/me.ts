import { User } from "@/app/entities/User";
import { httpClient } from "../httpClient";

interface MeResponse {
  data: User
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>('/users/me');

  return data;
}


