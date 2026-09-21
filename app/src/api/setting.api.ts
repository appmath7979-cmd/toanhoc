import { SettingResponse } from "@/types/setting.type";
import { baseApi } from "./base.api";

const pathSetting = "/settings";

async function getSettingById(customerId: string): Promise<SettingResponse> {
	const res = await baseApi.get(`${pathSetting}/${customerId}`);
	return res.data;
}

export { getSettingById };
