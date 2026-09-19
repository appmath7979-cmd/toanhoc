import {
	CustomerListRes,
	DeleteCustomerReq,
	GetCustomersReq,
} from "@/types/customer.type";
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
	return res.data;
}

async function createCustomer(data: CreateCustomer): Promise<BaseApi> {
	const res = await baseApi.post(pathCustomer, data);
	return res.data;
}

async function deleteCustomer(data: DeleteCustomerReq): Promise<BaseApi> {
	const res = await baseApi.delete(pathCustomer, { data });
	return res.data;
}

async function deleteCustomerById(id: string): Promise<BaseApi> {
	const res = await baseApi.delete(`${pathCustomer}/${id}`);
	return res.data;
}

export { getCustomer, createCustomer, deleteCustomer, deleteCustomerById };
