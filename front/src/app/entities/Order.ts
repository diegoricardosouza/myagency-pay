import { User } from "./User";

export interface Order {
  id: string;
  product: string;
  status: string;
  payment_method: string;
  price: number | string;
  date: string;
  transaction_id: string;
  user: User;
}
