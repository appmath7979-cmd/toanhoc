import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
	createCustomer,
	deleteCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from "@/apis/customer.api";
import type { CreateCustomer } from "@/schema/customer.schema";
import type { CustomerQuery } from "@/types/customer.type";

function useGetManyCustomer(req: CustomerQuery) {
	return useQuery({
		queryKey: ["customers", req],
		queryFn: () => getCustomers(req),
	});
}

function useGetCustomerById(customerId: string) {
	return useQuery({
		queryKey: ["customers", customerId],
		queryFn: () => getCustomerById(customerId),
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
		onError: (err) => {
			toast.error(err.message);
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
		onError: (err) => {
			toast.error(err.message);
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
		onError: (err) => {
			toast.error(err.message);
		},
	});
}

export {
	useCreateCustomer,
	useDeleteCustomer,
	useGetCustomerById,
	useGetManyCustomer,
	useUpdateCustomer,
};
