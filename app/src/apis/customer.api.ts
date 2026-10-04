import {
	CustomerQuery,
	CustomerRes,
	CustomerSettingRes,
} from "@/types/customer.type";
import appAPI from "./app.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { API } from "@/types/api.type";

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

async function getCustomerSetting(id: string): Promise<CustomerSettingRes> {
	const res = await appAPI.get(`${endpoint}/${id}`);
	console.log(res.statusText);
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
	getCustomers,
	createCustomer,
	updateCustomer,
	getCustomerSetting,
	deleteCustomer,
};
