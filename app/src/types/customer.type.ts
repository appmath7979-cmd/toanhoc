import { API, APIPagination } from "./api.type";
import { Setting } from "./setting.type";

type Sort = "latest" | "oldest" | "name_DESC" | "name_ASC";

interface CustomerQuery {
	page: number;
	search?: string;
	guest: boolean;
	sort?: Sort;
	active?: boolean;
}

interface Customer {
	active: boolean;
	created_at: string;
	full_name: string;
	id: string;
	is_guest: boolean;
	is_send: boolean;
	updated_at: string;
}

interface CustomerRes extends API, APIPagination {
	data: Customer[];
}

interface CustomerSetting extends Customer {
	setting: Setting;
}

interface CustomerSettingRes extends API {
	data: CustomerSetting;
}

export type {
	CustomerQuery,
	CustomerRes,
	Customer,
	CustomerSetting,
	CustomerSettingRes,
	Sort,
};
