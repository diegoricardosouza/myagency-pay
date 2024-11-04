import { User } from "./User";

export interface Order {
  id: string;
  product: string;
  status: string;
  type_payment: string;
  price: number | string;
  date: string;
  user: User;
}
