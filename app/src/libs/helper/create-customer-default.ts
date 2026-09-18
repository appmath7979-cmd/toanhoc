import { CreateCustomer } from "@/schema/customer.schema";

export const createCustomerDefault = {
	full_name: "",
	guest: true,
	phone_number: "",
	setting: {
		dax_t: "HALF",
		xienMB: false,
		bets: [
			{
				type: "b2",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
			{
				type: "dd2",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
			{
				type: "da",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
			{
				type: "dax",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
			{
				type: "b3",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
			{
				type: "dd3",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
			{
				type: "b4",
				percent: true,
				c: { mb: 0, mn: 0, mt: 0 },
				t: { mb: 0, mn: 0, mt: 0 },
			},
		],
	},
} satisfies CreateCustomer as CreateCustomer;
