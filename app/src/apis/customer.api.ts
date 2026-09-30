import { CustomerQuery, CustomerRes } from "@/types/customer.type";
import appAPI from "./app.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { API } from "@/types/api.type";

const endpoint = "customers";

async function getCustomers({
	guest,
	page,
	search,
	sort,
}: CustomerQuery): Promise<CustomerRes> {
	const res = await appAPI.get(endpoint, {
		params: {
			guest,
			page,
			search,
			sort,
		},
	});
	return res.data;
}

async function createCustomer(data: CreateCustomer): Promise<API> {
	const res = await appAPI.post(endpoint, data);
	return res.data;
}

async function updateCustomer(data: Partial<CreateCustomer>): Promise<API> {
	const res = await appAPI.patch(endpoint, data);
	return res.data;
}

export { getCustomers, createCustomer, updateCustomer };
