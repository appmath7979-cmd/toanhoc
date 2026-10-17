import type { Province } from "./address.type";
import type { Region } from "./region.type";

type Syntax = "b" | "dau" | "duoi" | "da" | "dax";
type BetType = "b2" | "dd2" | "da" | "dax" | "b3" | "dd3" | "b4";

interface MessageDetail {
	bet_type: BetType;
	co: number;
	number: string;
	syntax: Syntax;
	province: Province;
	score: number;
	trung: number;
}

interface MessageDetailRes extends MessageDetail {
	id: string;
	message_id: string;
	created_at: string;
	updated_at: string;
}

interface Message {
	id: string;
	at: string;
	content: string;
	customer_id: string;
	is_send: boolean;
	region: Region;
	message_details: MessageDetail[];
}

type CreateMessage = Omit<Message, "id">;

interface MessageRes extends Message {
	id: string;
	created_at: string;
	updated_at: string;
}

export type {
	CreateMessage,
	Message,
	MessageDetail,
	MessageDetailRes,
	MessageRes,
	Syntax,
};
