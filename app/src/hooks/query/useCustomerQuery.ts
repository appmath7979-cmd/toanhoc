import { createCustomer, getCustomer } from "@/api/customer.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { GetCustomersReq } from "@/types/customer.type";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

const useGetCustomers = (req: GetCustomersReq) =>
	useQuery({
		queryKey: ["customer", "list", req.page],
		queryFn: () => getCustomer(req),
		placeholderData: keepPreviousData,
		staleTime: 5000,
	});

const useCreateCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (req: CreateCustomer) => createCustomer(req),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customer"] });
			console.log(data);
		},
		onError: (err) => {
			console.log(err);
		},
	});
};

export { useGetCustomers, useCreateCustomer };
