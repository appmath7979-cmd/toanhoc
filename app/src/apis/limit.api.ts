import type { API } from "@/types/api.type";
import type {
  CreateCustomerLimit,
  CustomerLimitQuery,
  CustomerLimitRes,
} from "@/types/limit.type";
import appAPI from "./app.api";

const endpointCustomer = "limits/customer";

async function getCustomerLimit({
  day,
  id,
}: CustomerLimitQuery): Promise<CustomerLimitRes> {
  const res = await appAPI.get(`${endpointCustomer}/${id}`, {
    params: { day },
  });
  return res.data;
}

async function createCustomerLimit(data: CreateCustomerLimit): Promise<API> {
  const res = await appAPI.post(`${endpointCustomer}`, data);
  return res.data;
}

export { createCustomerLimit, getCustomerLimit };
