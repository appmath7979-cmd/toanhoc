interface BaseApi {
	message: string;
	status: number;
	success: boolean;
}

interface ListApi {
	page: number;
	total_items: number;
	total_pages: number;
}

export type { BaseApi, ListApi };
