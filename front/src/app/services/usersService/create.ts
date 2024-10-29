import { httpClient } from "../httpClient";

export interface UserParams {
  name: string;
  company: string;
  responsible: string;
  email: string;
  level: string;
  whatsapp: string;
  cpf: string;
  logo: File;
  password: string;
}

export async function create(params: UserParams) {
  const { data } = await httpClient.post('/users', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
