import { CreateCustomer, CustomerSchema } from "@/schema/customer.schema";
import { formOptions } from "@tanstack/react-form";

export const createCustomerFormOpts = formOptions({
	defaultValues: {
		full_name: "",
		phone_number: "",
		guest: true,
		setting: {
			dax_t: "HALF",
			xienMB: false,
			bets: [
				{
					type: "b2",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
				{
					type: "dd2",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
				{
					type: "da",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
				{
					type: "dax",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
				{
					type: "b3",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
				{
					type: "dd3",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
				{
					type: "b4",
					percent: false,
					c: { mb: 0, mn: 0, mt: 0 },
					t: { mb: 0, mn: 0, mt: 0 },
				},
			],
		},
	} as CreateCustomer,
	validators: {
		onChange: CustomerSchema,
	},
});
