import type { API } from "@/types/api.type";
import type { CreateReward, RewardRes } from "@/types/reward.type";
import appAPI from "./app.api";

const endpoint = "rewards";

async function getReward(at: string): Promise<RewardRes> {
  const res = await appAPI.get(`${endpoint}`, { params: { at } });
  return res.data;
}

async function createReward(data: CreateReward): Promise<API> {
  const res = await appAPI.post(`${endpoint}`, data);
  return res.data;
}

export { createReward, getReward };
