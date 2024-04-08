import { httpClient } from "../httpClient";

interface SignupParams {
  name: string;
  email: string;
  password: string;
}

export async function signup(params: SignupParams) {
  const { data } = await httpClient.post('/users', params);

  return data;
}


