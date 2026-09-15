import { CustomerListRes, GetCustomersReq } from "@/types/customer.type";
import { baseApi } from "./base.api";

async function getCustomer({
	page,
	active,
	search,
	sort,
}: GetCustomersReq): Promise<CustomerListRes> {
	const res = await baseApi.get(`/customers`, {
		params: {
			page,
			active,
			search,
			sort,
		},
	});
	const data: CustomerListRes = res.data;
	console.log();
	return data;
}

export { getCustomer };
