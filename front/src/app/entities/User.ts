export interface User {
  id: string;
  name: string;
  company: string;
  responsible: string;
  email: string;
  level: string;
  whatsapp: string;
  day: number;
  logo: string;
  plan: {
    id: string;
    name: string;
    updates: string;
    digital_midia: string;
    printed: string;
    presentations: string;
  }
}
