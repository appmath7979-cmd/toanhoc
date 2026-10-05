import {
	createCustomer,
	deleteCustomer,
	getCustomerMessage,
	getCustomers,
	getCustomerSetting,
	updateCustomer,
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

function useGetCustomerMessage(customerId: string, at: string) {
	return useQuery({
		queryKey: ["customers", customerId],
		queryFn: () => getCustomerMessage(customerId, at),
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

function useUpdateCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: Partial<CreateCustomer> & { id: string }) =>
			updateCustomer(data.id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});
}
function useDeleteCustomer() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteCustomer(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["customers"] });
		},
	});
}

export {
	useGetManyCustomer,
	useCreateCustomer,
	useGetCustomerSetting,
	useUpdateCustomer,
	useDeleteCustomer,
	useGetCustomerMessage
};
