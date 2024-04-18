import { User } from "./User";

interface Files {
  id: string;
  url: string;
}

interface Comments {
  id: string;
  content: string;
  files?: Files[]
}

export interface Jobs {
  id: string;
  site: string;
  page: string;
  format: string;
  other_formats: string;
  phrase: string;
  content: string;
  obs: number;
  type: string;
  status: string;
  created: string;
  user: User;
  files?: Files[];
  comments?: Comments[];
}
