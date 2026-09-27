import { useAppForm } from "@/context/form.context";
import BasicInfo from "./form/BasicInfo";
import SettingInfo from "./form/SettingInfo";
import { CreateCustomer, CustomerSchema } from "@/schema/customer.schema";
import {
	defaultBasicInfo,
	defaultSettingInfo,
} from "@/data/customer-form.data";
import { SaveIcon } from "lucide-react";
import Box from "@/components/ui/layouts/Box";

export default function AddCustomer() {
	const form = useAppForm({
		defaultValues: {
			...defaultBasicInfo,
			setting: { ...defaultSettingInfo },
		} as CreateCustomer,
		validators: {
			onChange: CustomerSchema,
			onBlur: CustomerSchema,
		},
	});

	return (
		<Box>
			<form className="space-y-6 contain">
				<BasicInfo
					form={form}
					fields={{
						full_name: "full_name",
						is_guest: "is_guest",
						phone_number: "phone_number",
					}}
				/>
				<SettingInfo
					form={form}
					fields={{
						setting: "setting",
					}}
				/>
				<form.AppForm>
					<form.SubscribeButton setChild>
						<SaveIcon />
						<span>Lưu thông tin</span>
					</form.SubscribeButton>
				</form.AppForm>
			</form>
		</Box>
	);
}
