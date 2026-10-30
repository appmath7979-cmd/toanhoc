import type { API } from "@/types/api.type";
import type { CreateReward, RewardRes } from "@/types/reward.type";
import appAPI from "./app.api";

const endpoint = "rewards";

async function getReward(at: string): Promise<RewardRes> {
  const res = await appAPI.get(`${endpoint}`, { params: { at } });
  return res.data;
}

async function createReward(data: CreateReward): Promise<API> {
  // const res = await appAPI.post(endpoint, data);
  // return res.data;
  const response = await fetch("http://localhost:8080/api/v1/rewards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Thêm Authorization token nếu app của bạn yêu cầu:
      // "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export { createReward, getReward };
