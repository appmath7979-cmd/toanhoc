import type { API } from "@/types/api.type";
import type { CreateCustomerLimit } from "@/types/limit.type";
import appAPI from "./app.api";

const endpointCustomer = "limits/customer";

async function createCustomerLimit(data: CreateCustomerLimit): Promise<API> {
  const res = await appAPI.post(`${endpointCustomer}/`);
  return res.data;
}
