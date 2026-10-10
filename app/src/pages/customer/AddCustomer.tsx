import BasicInfo from "@/components/customer/edit/BasicInfo";
import SettingInfo from "@/components/customer/edit/SettingInfo";
import Container from "@/components/ui/layouts/Container";
import { useAppForm } from "@/context/form.context";
import {
	defaultBasicInfo,
	defaultSettingInfo,
} from "@/data/customer-form.data";
import {
	useCreateCustomer,
	useGetCustomerById,
} from "@/hooks/query/use-customer-query";
import {
	CreateCustomer,
	CustomerSchema,
	CustomerSettingInfo,
} from "@/schema/customer.schema";
import { store } from "@/store/store";
import { useAppStore } from "@lavaz/store";
import { SaveIcon } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddCustomer() {
	const [{ customerId, mode }, { onFinish }] = useAppStore(
		store.customerAction,
		(s) => s,
	);

	const navigate = useNavigate();
	const { data } = useGetCustomerById(customerId);

	const { mutateAsync } = useCreateCustomer();

	const { basicInfo, settingInfo } = useMemo(() => {
		const basicInfo = defaultBasicInfo;
		let settingInfo: CustomerSettingInfo;
		if (!data?.data || !mode) {
			settingInfo = defaultSettingInfo;
		} else {
			const settingValues = data.data.setting;
			settingInfo = {
				setting: {
					bets: settingValues.bets,
					dax_t: settingValues.dax_t,
					xien_mb: settingValues.xien_mb,
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
		defaultValues: defaultValues,
		validators: {
			onChange: CustomerSchema,
			onBlur: CustomerSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await mutateAsync(value);
			if (res.success) {
				toast.success(res.message);
				onFinish();
				navigate("/");
			} else {
				if (res.status === 500) toast.error("Có lỗi xảy ra!");
				else toast.error(res.message);
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
