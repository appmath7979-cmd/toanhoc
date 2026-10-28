import type { Region } from "./address.type";
import type { API } from "./api.type";
import type { Syntax } from "./message.type";
import type { BetType } from "./setting.type";

interface CustomerLimitQuery {
  id: string;
  day: number;
}

interface Limit {
  region: Region;
  bet_type: BetType;
  syntax: Syntax;
  province_name: string;
  value: number;
}

interface CreateCustomerLimit {
  day: number;
  customer_id: string;
  limits: Limit[];
}

type CustomerLimit = CreateCustomerLimit & {
  id: string;
  created_at: string;
  updated_at: string;
};

interface CustomerLimitRes extends API {
  data: CustomerLimit;
}

export type {
  CreateCustomerLimit,
  CustomerLimit,
  CustomerLimitQuery,
  CustomerLimitRes,
  Limit,
};
