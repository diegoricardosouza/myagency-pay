import { httpClient } from "../httpClient";

export interface RegisterParams {
  name: string;
  company: string;
  responsible: string;
  email: string;
  level: string;
  whatsapp: string;
  cpf: string;
  password: string;
}

export async function register(params: RegisterParams) {
  const { data } = await httpClient.post('/register', params);

  return data;
}


