import {
	createCustomer,
	deleteCustomer,
	deleteCustomerById,
	getCustomer,
	updateCustomerWithSetting,
} from "@/api/customer.api";
import { CreateCustomer } from "@/schema/customer.schema";
import { DeleteCustomerReq, GetCustomersReq } from "@/types/customer.type";
import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

const useGetCustomers = (req: GetCustomersReq) =>
	useQuery({
		queryKey: ["customer", "list", req],
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

const useUpdateCustomerWithSetting = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			customerId,
			req,
		}: {
			customerId: string;
			req: Partial<CreateCustomer>;
		}) => updateCustomerWithSetting(customerId, req),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customer"] });
			console.log(data);
		},
		onError: (err) => {
			console.log(err);
		},
	});
};

const useDelteCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (req: DeleteCustomerReq) => deleteCustomer(req),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customer"] });
			console.log(data);
		},
		onError: (err) => {
			console.log(err);
		},
	});
};

const useDeleteCustomerById = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteCustomerById(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["customer"] });
			console.log(data);
		},
		onError: (err) => {
			console.log(err);
		},
	});
};

export {
	useGetCustomers,
	useCreateCustomer,
	useUpdateCustomerWithSetting,
	useDelteCustomer,
	useDeleteCustomerById,
};
