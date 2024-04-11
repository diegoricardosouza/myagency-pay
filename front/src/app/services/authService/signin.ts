import { httpClient } from "../httpClient";

export interface SigninParams {
  email: string;
  password: string;
}

interface SigninResponse {
  token: string;
}

export async function signin(params: SigninParams) {
  const { data } = await httpClient.post<SigninResponse>('/login', params);

  return data;
}
