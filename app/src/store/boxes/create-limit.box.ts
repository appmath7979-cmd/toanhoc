import { createBox } from "@lavaz/store";
import type { Region } from "@/types/address.type";
import type { Limit } from "@/types/limit.type";

interface CreateLimitState {
  mb: Limit[];
  mt: Limit[];
  mn: Limit[];
}

const initialState = {
  mb: [],
  mt: [],
  mn: [],
} satisfies CreateLimitState as CreateLimitState;

const limitKey = (l: Limit) => `${l.bet_type}|${l.province_name}|${l.syntax}`;

export const createLimitBox = createBox(initialState, (set) => ({
  setLimit: (region: Region, value: Limit) =>
    set((prev) => {
      const currentList = prev[region];
      const index = currentList.findIndex(
        (item) =>
          item.province_name === value.province_name &&
          item.bet_type === value.bet_type &&
          item.syntax === value.syntax,
      );

      if (index === -1) {
        return { ...prev, [region]: [...currentList, value] };
      } else {
        const updatedList = [...currentList];
        updatedList[index] = value;
        return { ...prev, [region]: updatedList };
      }
    }),
  setManyLimit: (region: Region, limits: Limit[]) =>
    set((prev) => {
      const merged = new Map<string, Limit>(
        prev[region].map((item) => [limitKey(item), item]),
      );
      for (const limit of limits) {
        merged.set(limitKey(limit), limit);
      }
      const next = { ...prev, [region]: Array.from(merged.values()) };
      console.log("setManyLimit next", next[region]);

      return { ...prev, [region]: Array.from(merged.values()) };
    }),
  setInitLimit: (limits: Limit[]) =>
    set((prev) => {
      const mb = limits
        .filter((item) => item.region === "mb")
        .map((item) => ({ ...item }));
      const mn = limits
        .filter((item) => item.region === "mn")
        .map((item) => ({ ...item }));
      const mt = limits
        .filter((item) => item.region === "mt")
        .map((item) => ({ ...item }));

      return {
        ...prev,
        mb,
        mt,
        mn,
      };
    }),
  resetData: () => set(initialState),
})).create();
