import BasicInfo from "@/components/customer/edit/BasicInfo";
import SettingInfo from "@/components/customer/edit/SettingInfo";
import Container from "@/components/ui/layouts/Container";
import { useAppForm } from "@/context/form.context";
import {
	defaultBasicInfo,
	defaultSettingInfo,
} from "@/data/customer-form.data";
import { CreateCustomer, CustomerSchema } from "@/schema/customer.schema";
import { SaveIcon } from "lucide-react";

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
		<Container>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation;
					form.handleSubmit;
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
