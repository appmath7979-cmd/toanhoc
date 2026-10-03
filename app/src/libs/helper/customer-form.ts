import { defaultBasicInfo } from "@/data/customer-form.data";
import {
	CustomerBasicInfo,
	CustomerSettingInfo,
} from "@/schema/customer.schema";
import { CustomerSetting } from "@/types/customer.type";

export default function customerFormData(
	values: CustomerSetting,
	isEdit: boolean,
): {
	basicInfo: CustomerBasicInfo;
	settingInfo: CustomerSettingInfo;
} {
	const settingInfo: CustomerSettingInfo = {
		setting: {
			bets: values.setting.bets,
			dax_t: values.setting.dax_t,
			xien_mb: values.setting.xien_mb,
		},
	};

	if (!isEdit) {
		const basicInfo: CustomerBasicInfo = defaultBasicInfo;

		return { basicInfo, settingInfo };
	} else {
		const basicInfo: CustomerBasicInfo = {
			full_name: values.full_name,
			is_guest: values.is_guest,
		};

		return { basicInfo, settingInfo };
	}
}
