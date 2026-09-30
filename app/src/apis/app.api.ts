import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "";

const appAPI = axios.create({
	baseURL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
	timeout: 10000,
});

appAPI.interceptors.response.use(
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

export default appAPI;
