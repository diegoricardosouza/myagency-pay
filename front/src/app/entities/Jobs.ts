import { Comments } from "./Comments";
import { User } from "./User";

export interface Files {
  id: string;
  name: string;
  url: string;
}

export interface Jobs {
  id: string;
  site: string;
  page: string;
  format: string;
  other_formats: string;
  phrase: string;
  content: string;
  obs: string;
  type: string;
  status: string;
  created: string;
  user: User;
  files?: Files[];
  comments?: Comments[];
}
