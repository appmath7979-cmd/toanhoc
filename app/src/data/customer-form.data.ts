import { RadioItemProps } from "@/components/ui/form/Radio";
import { CustomerBasicInfo } from "@/schema/customer.schema";

const defaultBasicInfo = {
	full_name: "",
	phone_number: "",
	is_guest: false,
} as CustomerBasicInfo;

const defaultSettingInfo = {
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
};

const xienMbRadio: RadioItemProps[] = [
	{
		id: "xien-mb-true",
		label: "Cho phép",
		value: "true",
		description: "Cho phép khách hàng đá xiên",
	},
	{
		id: "xien-mb-false",
		label: "Không",
		value: "false",
		description: "Không cho phép khách hàng đá xiên",
	},
];

const guestRadio: RadioItemProps[] = [
	{
		id: "guest-true",
		label: "Khách",
		value: "true",
		description: "Khách hàng là người gửi tin cho bạn",
	},
	{
		id: "guest-false",
		label: "Chủ",
		value: "false",
		description: "Khách hàng là người nhận tin của bạn",
	},
];

const daxTRadio: RadioItemProps[] = [
	{
		id: "daxt-one",
		label: "Một ky",
		value: "ONE",
	},
	{
		id: "daxt-half",
		label: "Ky rưỡi",
		value: "HALF",
	},
	{
		id: "daxt-many",
		label: "Nhiều ky",
		value: "MANY",
	},
];

export {
	defaultBasicInfo,
	defaultSettingInfo,
	xienMbRadio,
	guestRadio,
	daxTRadio,
};
