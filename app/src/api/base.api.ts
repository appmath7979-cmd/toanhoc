import axios from "axios";

const baseURL = import.meta.env.BASE_URL || "";

export const baseApi = axios.create({
	baseURL,
	timeout: 10000,
	withCredentials: true,
	headers: { "Content-Type": "application/json" },
});

baseApi.interceptors.response.use(
	(response) => response.data,
	(err) => {
		const message = err.response?.data?.message || "Đã có lỗi xảy ra";
		return Promise.reject(new Error(message));
	},
);
