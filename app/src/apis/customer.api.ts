import { CustomerQuery, CustomerRes } from "@/types/customer.type";
import appAPI from "./app.api";

const endpoint = "/customers";

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

export { getCustomers };
