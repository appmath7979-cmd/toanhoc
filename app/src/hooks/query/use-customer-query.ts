import { createCustomer, getCustomers } from "@/apis/customer.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { CustomerQuery } from "@/types/customer.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useGetManyCustomer(req: CustomerQuery) {
	return useQuery({
		queryKey: ["customers", req],
		queryFn: () => getCustomers(req),
	});
}

function useCreateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateCustomer) => createCustomer(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});
}

export { useGetManyCustomer, useCreateCustomer };
