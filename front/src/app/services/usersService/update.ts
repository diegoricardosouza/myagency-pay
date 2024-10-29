import { httpClient } from "../httpClient";

export interface UpdateUserParams {
  id: string;
  name: string;
  company: string;
  responsible: string;
  email: string;
  level: string;
  whatsapp: string;
  cpf: string;
  logo?: File | null | string;
  password?: string | null;
}

export async function update({ id, ...params }: UpdateUserParams) {
  const { data } = await httpClient.post(`/users/${id}`, params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
