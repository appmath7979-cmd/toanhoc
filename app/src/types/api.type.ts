interface API {
	message: string;
	status: number;
	success: boolean;
}

interface APIPagination {
	total_item: number;
	total_page: number;
}

export type { API, APIPagination };
