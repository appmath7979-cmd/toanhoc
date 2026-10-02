import {
	CreateCustomer,
	CustomerBasicInfo,
	CustomerSettingInfo,
} from "@/schema/customer.schema";

const defaultBasicInfo = {
	full_name: "",
	is_guest: true,
} as CustomerBasicInfo;

const defaultSettingInfo = {
	setting: {
		dax_t: "HALF",
		xien_mb: false,
		bets: [
			{
				bet_type: "b2",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 70, mn: 70, mt: 70 },
			},
			{
				bet_type: "dd2",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 70, mn: 70, mt: 70 },
			},
			{
				bet_type: "da",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 250, mn: 350, mt: 350 },
			},
			{
				bet_type: "dax",
				percent: true,
				c: { mb: 0, mn: 0.7, mt: 0.7 },
				t: { mb: 0, mn: 350, mt: 350 },
			},
			{
				bet_type: "b3",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 600, mn: 600, mt: 600 },
			},
			{
				bet_type: "dd3",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 500, mn: 500, mt: 500 },
			},
			{
				bet_type: "b4",
				percent: true,
				c: { mb: 0.7, mn: 0.7, mt: 0.7 },
				t: { mb: 4000, mn: 4000, mt: 4000 },
			},
		],
	},
} as CustomerSettingInfo;

export { defaultBasicInfo, defaultSettingInfo };
