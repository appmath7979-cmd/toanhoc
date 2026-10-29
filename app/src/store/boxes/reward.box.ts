import { createBox } from "@lavaz/store";
import type { Region } from "@/types/region.type";
import type { RewardValue } from "@/types/reward.type";

interface RewardState {
  mb: RewardValue[];
  mt: RewardValue[];
  mn: RewardValue[];
}

const initialState = {
  mb: [],
  mn: [],
  mt: [],
} satisfies RewardState as RewardState;

export const rewardBox = createBox(initialState, (set) => ({
  setReward: (region: Region, values: RewardValue[]) =>
    set((prev) => {
      const current = prev[region];
      const exist = current.filter(
        (item) => item.province === values[0].province,
      );
      if (exist.length === 0)
        return { ...prev, [region]: [...current, ...values] };
      else {
        const filtered = current.filter(
          (item) => item.province !== values[0].province,
        );
        return { ...prev, [region]: [...filtered, ...values] };
      }
    }),
  setInitReward: (rewards: RewardValue[] | undefined) =>
    set((prev) => {
      if (!rewards) return initialState;
      const mb = rewards.filter((item) => item.region === "mb");
      const mt = rewards.filter((item) => item.region === "mt");
      const mn = rewards.filter((item) => item.region === "mn");

      return { ...prev, mb, mt, mn };
    }),
})).create();
