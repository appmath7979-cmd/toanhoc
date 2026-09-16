import { CustomerListRes, GetCustomersReq } from "@/types/customer.type";
import { baseApi } from "./base.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { BaseApi } from "@/types/api.type";

const pathCustomer = "/customers"

async function getCustomer({
	page,
	active,
	search,
	sort,
}: GetCustomersReq): Promise<CustomerListRes> {
	const res = await baseApi.get(pathCustomer, {
		params: {
			page,
			active,
			search,
			sort,
		},
	});
	const data: CustomerListRes = res.data;
	return data;
}

async function createCustomer(data: CreateCustomer): Promise<BaseApi> {
	const res = await baseApi.post(pathCustomer, data)
	const dt = res.data
	return dt
}

export { getCustomer, createCustomer };
