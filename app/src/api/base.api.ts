import axios from "axios";

const baseURL = import.meta.env.BASE_URL || "";

const baseApi = axios.create({
	baseURL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export { baseApi };
