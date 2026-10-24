import type { Region } from "./address.type";
import type { BetType } from "./setting.type";

interface Limit {
  region: Region;
  bet_type: BetType;
  province_name: string;
  value: number;
}

interface CreateCustomerLimit {
  day: number;
  customer_id: string;
  limits: Limit[];
}

export type { CreateCustomerLimit, Limit };
