import type { API } from "@/types/api.type";
import type {
  CreateMessage,
  GetManyMessageReq,
  ManyMessageRes,
  MessageItemRes,
} from "@/types/message.type";
import appAPI from "./app.api";

const endpoint = "messages";

async function getManyMessage(req: GetManyMessageReq): Promise<ManyMessageRes> {
  const { at, id, region } = req;
  const res = await appAPI.get(`${endpoint}`, { params: { at, id, region } });
  return res.data;
}

async function createMessage(data: CreateMessage): Promise<API> {
  const res = await appAPI.post(`${endpoint}`, data);
  return res.data;
}

async function deleteMessage(id: string): Promise<API> {
  const res = await appAPI.delete(`${endpoint}/${id}`);
  return res.data;
}

async function getMessageById(id: string): Promise<MessageItemRes> {
  const res = await appAPI.get(`${endpoint}/${id}`);
  return res.data;
}

export { createMessage, deleteMessage, getManyMessage, getMessageById };
