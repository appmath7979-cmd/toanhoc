import { CreateCustomer, CustomerSchema } from "@/schema/customer.schema";
import { formOptions } from "@tanstack/react-form";
import { createCustomerDefault } from "./create-customer-default";

export const createCustomerFormOpts = (initData?: CreateCustomer) => {
	return formOptions({
		defaultValues: {
			...createCustomerDefault,
			...initData,
		} as CreateCustomer,
		validators: {
			onChange: CustomerSchema,
		},
	});
};
