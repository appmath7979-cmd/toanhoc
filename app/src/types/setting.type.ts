import { CreateSetting } from "@/schema/customer.schema";
import { BaseApi } from "./api.type";

interface SettingResponse extends BaseApi {
	data: CreateSetting;
}

export type { SettingResponse };
