import {
	createCustomer,
	getCustomers,
	getCustomerSetting,
} from "@/apis/customer.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { CustomerQuery } from "@/types/customer.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function useGetManyCustomer(req: CustomerQuery) {
	return useQuery({
		queryKey: ["customers", req],
		queryFn: () => getCustomers(req),
	});
}

function useGetCustomerSetting(customerId: string) {
	return useQuery({
		queryKey: ["customers", customerId],
		queryFn: () => getCustomerSetting(customerId),
		enabled: !!customerId,
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

export { useGetManyCustomer, useCreateCustomer, useGetCustomerSetting };
