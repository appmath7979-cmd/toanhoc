import { getCustomer } from "@/api/customer.api";
import { GetCustomersReq } from "@/types/customer.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useGetCustomers = (req: GetCustomersReq) => {
	const { page, ...rest } = req;

	return useQuery({
		queryKey: ["customer", "list", req.page, { ...rest }],
		queryFn: () => getCustomer(req),
		placeholderData: keepPreviousData,
		staleTime: 5000,
	});
};

export { useGetCustomers };
