import { createBox } from "@lavaz/store";
import type { Region } from "@/types/address.type";
import type { Limit } from "@/types/limit.type";

interface CreateLimitState {
  mb: {
    value: Limit;
    errStr: string;
  }[];
  mt: {
    value: Limit;
    errStr: string;
  }[];
  mn: {
    value: Limit;
    errStr: string;
  }[];
}

const initialState = {
  mb: [],
  mt: [],
  mn: [],
} satisfies CreateLimitState as CreateLimitState;

export const createLimitBox = createBox(initialState, (set) => ({
  setLimit: (region: Region, value: Limit) =>
    set((prev) => {
      console.log(value);

      const exists = prev[region].find(
        (item) =>
          item.value.province_name === value.province_name &&
          item.value.bet_type === value.bet_type,
      );

      const errStr: string =
        value.value < 0 ? "Giá trị tối thiểu phải là 0" : "";

      if (!exists) {
        return { ...prev, [region]: [...prev[region], { value, errStr }] };
      } else {
        const filtered = prev[region].filter(
          (item) =>
            item.value.province_name !== value.province_name &&
            item.value.bet_type !== value.bet_type,
        );

        return { ...prev, [region]: [...filtered, { value, errStr }] };
      }
    }),
})).create();
