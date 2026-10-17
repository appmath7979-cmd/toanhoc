import type { API } from "@/types/api.type";
import type { CreateMessage } from "@/types/message.type";
import appAPI from "./app.api";

const endpoint = "messages";

async function createMessage(data: CreateMessage): Promise<API> {
	const res = await appAPI.post(`${endpoint}`, data);
	return res.data;
}

export { createMessage };
