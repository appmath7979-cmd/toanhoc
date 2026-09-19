import { BaseApi, ListApi } from "./api.type";

interface GetCustomersReq {
	page: number;
	search?: string;
	active?: "true" | "false";
	guest?: "true" | "false";
	sort?: "latest" | "oldest" | "name_ASC" | "name_DESC";
}

interface CustomerListItemRes {
	id: string;
	full_name: string;
	phone_number: string;
	guest: boolean;
	active: boolean;
	created_at: string;
	updated_at: string;
}

interface CustomerListRes extends BaseApi, ListApi {
	data: CustomerListItemRes[];
}

interface DeleteCustomerReq {
	ids: string[];
}

export type {
	CustomerListItemRes,
	CustomerListRes,
	GetCustomersReq,
	DeleteCustomerReq,
};
