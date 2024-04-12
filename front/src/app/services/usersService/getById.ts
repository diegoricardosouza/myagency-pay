import { User } from "@/app/entities/User";
import { httpClient } from "../httpClient";

export interface UserResponse {
  data: User
}

export async function getById(id: string) {
  const { data } = await httpClient.get<UserResponse>(`/users/${id}`);

  return data;
}
