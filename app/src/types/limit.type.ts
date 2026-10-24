import type { Region } from "./address.type";

interface Limit {
  region: Region;
  province_name: string;
  value: number;
}

interface CreateCustomerLimit {
  day: number;
  customer_id: string;
  limits: Limit[];
}

export type { CreateCustomerLimit, Limit };
