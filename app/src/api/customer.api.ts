import { CustomerListRes, GetCustomersReq } from "@/types/customer.type";
import { baseApi } from "./base.api";

async function getCustomer({ page, active, search, sort }: GetCustomersReq) {
	const res = await baseApi.get(
		`/customers?page=${page}&search=${search}&active=${active}&sort=${sort}`,
	);
	const data: CustomerListRes = res.data;
	return data;
}

export { getCustomer };
