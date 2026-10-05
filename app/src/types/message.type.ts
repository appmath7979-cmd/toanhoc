import { Province } from "./address.type";
import { Region } from "./region.type";

type BetType = "b2" | "dd2" | "da" | "dax" | "b3" | "dd3" | "b4";

interface MessageDetail {
  bet_type: BetType;
  co: number;
  number: string;
  syntax: "b";
  province: Province;
  score: number;
  trung: number;
}

interface MessageDetailRes extends MessageDetail {
  id: string;
  message_id: string;
  created_at: string
  updated_at: string
}


interface Message {
  "id": string,
  "at": string,
  "content": string,
  "customer_id": string,
  "is_send": boolean,
  "region": Region,
  message_details: MessageDetail[]
}

interface MessageRes extends Message {
  id: string;
  created_at: string
  updated_at: string
}

export type { MessageDetail, Message, MessageDetailRes, MessageRes }
