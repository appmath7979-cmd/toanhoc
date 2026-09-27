import { getCustomers } from "@/apis/customer.api";
import { CustomerQuery } from "@/types/customer.type";
import { useQuery } from "@tanstack/react-query";

const useQueryCustomer = (queries: CustomerQuery) =>
	useQuery({
		queryKey: ["customer", "list", queries],
		queryFn: () => getCustomers(queries),
	});

export { useQueryCustomer };
