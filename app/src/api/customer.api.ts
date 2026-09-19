import { CustomerListRes, DeleteCustomerReq, GetCustomersReq } from "@/types/customer.type";
import { baseApi } from "./base.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { BaseApi } from "@/types/api.type";

const pathCustomer = "/customers";

async function getCustomer({
	page,
	active,
	search,
	guest,
	sort,
}: GetCustomersReq): Promise<CustomerListRes> {
	const res = await baseApi.get(pathCustomer, {
		params: {
			page,
			active,
			search,
			sort,
			guest,
		},
	});
	const data: CustomerListRes = res.data;
	return data;
}

async function createCustomer(data: CreateCustomer): Promise<BaseApi> {
	const res = await baseApi.post(pathCustomer, data);
	const dt = res.data;
	return dt;
}

async function deleteCustomer(data: DeleteCustomerReq): Promise<BaseApi> {
	const res = await baseApi.delete(pathCustomer, { data })
	const dt = res.data
	return dt
}

export { getCustomer, createCustomer, deleteCustomer };
