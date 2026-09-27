import { API, APIPagination } from "./api.type";

interface CustomerQuery {
	page: number;
	search?: string;
	guest: boolean;
	sort?: "latest" | "oldest" | "name_DESC" | "name_ASC";
}

interface Customer {
	id: string;
	full_name: string;
	phone_number: string;
	is_guest: boolean;
	is_send: boolean;
	active: boolean;
	created_at: string;
	updated_at: string;
}

interface CustomerRes extends API, APIPagination {
	data: Customer[];
}

export type { CustomerQuery, CustomerRes };
