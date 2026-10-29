import type { Province } from "./address.type";
import type { API } from "./api.type";
import type { Region } from "./region.type";

type RewardRank = "g8" | "g7" | "g6" | "g5" | "g4" | "g3" | "g2" | "g1" | "gDB";

interface RewardValue {
  region: Region;
  province: Province;
  rank: RewardRank;
  values: string[];
}

interface CreateReward {
  at: string;
  reward_values: RewardValue[];
}

interface Reward extends CreateReward {
  id: string;
  created_at: string;
  updated_at: string;
}

interface RewardRes extends API {
  data: Reward;
}

export type { CreateReward, Reward, RewardRank, RewardRes, RewardValue };
