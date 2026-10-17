import type { SettingRes } from "@/types/setting.type";
import appAPI from "./app.api";

const endpoint = "settings";

async function getSettingByCustomerId(id: string): Promise<SettingRes> {
	const res = await appAPI.get(`${endpoint}/${id}`);
	return res.data;
}

export { getSettingByCustomerId };
