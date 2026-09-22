import { CreateCustomer } from "@/schema/customer.schema";

export const createCustomerDefault = {
	full_name: "",
	guest: true,
	phone_number: "",
	setting: {
		dax_t: "HALF",
		xien_mb: false,
		bets: [
			{
				type: "b2",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 70, mn: 70, mt: 70 },
			},
			{
				type: "dd2",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 70, mn: 70, mt: 70 },
			},
			{
				type: "da",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 250, mn: 350, mt: 350 },
			},
			{
				type: "dax",
				percent: true,
				c: { mb: 0, mn: 0.7, mt: 0.7 },
				t: { mb: 0, mn: 350, mt: 350 },
			},
			{
				type: "b3",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 600, mn: 600, mt: 600 },
			},
			{
				type: "dd3",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 500, mn: 500, mt: 500 },
			},
			{
				type: "b4",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 4000, mn: 4000, mt: 4000 },
			},
		],
	},
} satisfies CreateCustomer as CreateCustomer;
