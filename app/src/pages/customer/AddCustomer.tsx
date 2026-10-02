import BasicInfo from "@/components/customer/edit/BasicInfo";
import SettingInfo from "@/components/customer/edit/SettingInfo";
import Container from "@/components/ui/layouts/Container";
import { useAppForm } from "@/context/form.context";
import {
	defaultBasicInfo,
	defaultSettingInfo,
} from "@/data/customer-form.data";
import { useCreateCustomer } from "@/hooks/query/use-customer-query";
import {
	CreateCustomer,
	CustomerBasicInfo,
	CustomerSchema,
	CustomerSettingInfo,
} from "@/schema/customer.schema";
import { SaveIcon } from "lucide-react";

export default function AddCustomer({
	mode = "add",
	basicInfo,
	settingInfo,
}: {
	mode?: "add" | "edit";
	basicInfo?: CustomerBasicInfo;
	settingInfo?: CustomerSettingInfo;
}) {
	const { mutateAsync: create } = useCreateCustomer();

	const defaultValues: CreateCustomer = {
		...defaultBasicInfo,
		...basicInfo,
		setting: settingInfo?.setting ?? defaultSettingInfo.setting,
	};

	const form = useAppForm({
		defaultValues: defaultValues,
		validators: {
			onChange: CustomerSchema,
			onBlur: CustomerSchema,
		},
		onSubmit: async ({ value }) => {
			if (mode === "add") {
				await create(value);
			}
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
