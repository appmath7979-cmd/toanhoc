import BasicInfo from "@/components/customer/edit/BasicInfo";
import SettingInfo from "@/components/customer/edit/SettingInfo";
import Container from "@/components/ui/layouts/Container";
import { useAppForm } from "@/context/form.context";
import { defaultBasicInfo, defaultSettingInfo } from "@/data/customer-form.data";
import {
	useCreateCustomer,
	useGetCustomerSetting,
} from "@/hooks/query/use-customer-query";
import customerFormData from "@/libs/helper/customer-form";
import { CreateCustomer, CustomerBasicInfo, CustomerSchema, CustomerSettingInfo } from "@/schema/customer.schema";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { SaveIcon } from "lucide-react";
import { useMemo } from "react";

export default function AddCustomer() {
	const [{ customerId, mode }, { onFinish }] = useAppStore(
		store.customerAction,
		(s) => s,
	);

	const { data } = useGetCustomerSetting(customerId)

	const { mutateAsync: create } = useCreateCustomer();

	const { basicInfo, settingInfo } = useMemo(() => {
		console.log(mode)
		if (!data?.data || !mode) {
			return { basicInfo: defaultBasicInfo, settingInfo: defaultSettingInfo };
		}

		const values = data.data
		return customerFormData(values, mode === "edit")

	}, [data, data?.data, mode]);

	const defaultValues: CreateCustomer = {
		...basicInfo,
		setting: settingInfo.setting,
	};

	console.log(defaultValues)

	const form = useAppForm({
		defaultValues: defaultValues,
		validators: {
			onChange: CustomerSchema,
			onBlur: CustomerSchema,
		},
		onSubmit: async ({ value }) => {
			// if (mode === "copy" || !mode) {
			// 	await create(value);
			// }
		},
	});

	return (
		<Container>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<BasicInfo
					form={form}
					fields={{ full_name: "full_name", is_guest: "is_guest" }}
				/>
				<SettingInfo form={form} fields={{ setting: "setting" }} />
				<form.AppForm>
					<form.SubscribeButton>
						<SaveIcon />
						<span>Lưu thông tin</span>
					</form.SubscribeButton>
				</form.AppForm>
			</form>
		</Container>
	);
}
