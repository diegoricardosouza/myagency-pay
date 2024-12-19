import { httpClient } from "../httpClient";

export interface RegisterParams {
  name: string;
  company: string;
  responsible: string;
  email: string;
  level: string;
  whatsapp: string;
  cpf: string;
  address: string;
  zipcode: string;
  city: string;
  state: string;
  neighborhood: string;
  credits: string | number;
}

export async function register(params: RegisterParams) {
  const { data } = await httpClient.post('/register', params);

  return data;
}


