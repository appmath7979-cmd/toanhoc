import { createBox } from "@lavaz/store";
import type { Region } from "@/types/region.type";

interface RegionState {
  value: Region;
  label: string;
}

const initialState = {
  value: "mb",
  label: "Chọn miền",
} satisfies RegionState as RegionState;

export const regionBox = createBox(initialState, (set) => ({
  setValue: (value: Region) =>
    set((prev) => {
      switch (value) {
        case "mb":
          return { ...prev, value, label: "Miền Bắc" };
        case "mt":
          return { ...prev, value, label: "Miền Trung" };
        case "mn":
          return { ...prev, value, label: "Miền Nam" };
        default:
          return { ...prev, value, label: "Chọn miền" };
      }
    }),
})).create();
