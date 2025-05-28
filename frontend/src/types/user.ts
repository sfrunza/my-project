export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  phone: string;
  role: string;
  active: boolean;
  created_at?: Date;
}