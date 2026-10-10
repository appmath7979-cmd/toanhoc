import BasicInfo from "@/components/customer/edit/BasicInfo";
import SettingInfo from "@/components/customer/edit/SettingInfo";
import Container from "@/components/ui/layouts/Container";
import { useAppForm } from "@/context/form.context";
import {
	defaultBasicInfo,
	defaultSettingInfo,
} from "@/data/customer-form.data";
import {
	useGetCustomerById,
	useUpdateCustomer,
} from "@/hooks/query/use-customer-query";
import {
	CreateCustomer,
	CustomerBasicInfo,
	CustomerSchema,
	CustomerSettingInfo,
} from "@/schema/customer.schema";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { SaveIcon } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function EditCustomer() {
	const [{ customerId, mode }, { onFinish }] = useAppStore(
		store.customerAction,
		(s) => s,
	);

	const navigate = useNavigate();
	const { mutateAsync } = useUpdateCustomer();

	const { data, isError, isPaused } = useGetCustomerById(customerId);

	if (isError || !data || !data.data || isPaused) {
		// navigate("/")
	}

	const { basicInfo, settingInfo } = useMemo(() => {
		let basicInfo: CustomerBasicInfo;
		let settingInfo: CustomerSettingInfo;
		if (!data?.data || !mode) {
			basicInfo = defaultBasicInfo;
			settingInfo = defaultSettingInfo;
		} else {
			const values = data.data;
			basicInfo = {
				full_name: values.full_name,
				is_guest: values.is_guest,
			};
			settingInfo = {
				setting: {
					bets: values.setting.bets,
					dax_t: values.setting.dax_t,
					xien_mb: values.setting.xien_mb,
				},
			};
		}

		return { basicInfo, settingInfo };
	}, [data, data?.data]);

	const defaultValues: CreateCustomer = {
		...basicInfo,
		setting: settingInfo.setting,
	};

	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: CustomerSchema,
			onBlur: CustomerSchema,
		},
		onSubmit: async ({ value }) => {
			const payload = { ...value, id: customerId };
			await mutateAsync(payload);
			onFinish();
			navigate("/");
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
