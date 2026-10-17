import type { API } from "./api.type";

type BetType = "b2" | "dd2" | "da" | "dax" | "b3" | "dd3" | "b4";
type DaxT = "ONE" | "HALF" | "MANY";

interface BetValue {
	mb: number;
	mn: number;
	mt: number;
}

interface BetPair {
	bet_type: BetType;
	c: BetValue;
	percent: boolean;
	t: BetValue;
}

interface Setting {
	id: string;
	xien_mb: true;
	bets: BetPair[];
	dax_t: DaxT;
	customer_id: string;
	updated_at: string;
	created_at: string;
}

type SettingRes = { data: Setting } & API;

export type { BetPair, BetType, BetValue, Setting, SettingRes };
