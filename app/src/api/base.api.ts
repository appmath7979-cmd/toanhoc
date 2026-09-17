import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "";

export const baseApi = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

baseApi.interceptors.response.use(
	(response) => response,
	(err) => {
		const message =
			err.response?.data?.error ||
			err.response?.data?.details ||
			err.message ||
			"Đã có lỗi xảy ra";

		return Promise.reject(new Error(message));
	},
);
