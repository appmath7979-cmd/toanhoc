import type { CreateCustomer } from "@/schema/customer.schema";
import type { API } from "@/types/api.type";
import type {
  CustomerByIdRes,
  CustomerQuery,
  CustomerRes,
} from "@/types/customer.type";
import appAPI from "./app.api";

const endpoint = "customers";

async function getCustomers({
  guest,
  page,
  search,
  sort,
  active,
}: CustomerQuery): Promise<CustomerRes> {
  const res = await appAPI.get(endpoint, {
    params: {
      guest,
      page,
      search,
      sort,
      active,
    },
  });
  return res.data;
}

async function getCustomerById(id: string): Promise<CustomerByIdRes> {
  const res = await appAPI.get(`${endpoint}/${id}`);
  return res.data;
}

async function createCustomer(data: CreateCustomer): Promise<API> {
  const res = await appAPI.post(endpoint, data);
  return res.data;
}

async function updateCustomer(
  id: string,
  data: Partial<CreateCustomer>,
): Promise<API> {
  const res = await appAPI.patch(`${endpoint}/${id}`, data);
  return res.data;
}

async function deleteCustomer(customerId: string): Promise<API> {
  const res = await appAPI.delete(`${endpoint}/${customerId}`);
  return res.data;
}

export {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer,
};
