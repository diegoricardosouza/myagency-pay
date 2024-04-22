import { httpClient } from "../httpClient";

export interface CommentsParams {
  content: string;
  job_id: string;
  user_id: string;
  files?: File[] | null | undefined;
}

export async function create(params: CommentsParams) {
  const { data } = await httpClient.post('/comments', params, { headers: { "Content-Type": "multipart/form-data" } });

  return data;
}
