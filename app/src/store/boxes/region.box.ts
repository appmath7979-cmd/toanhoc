import { Region } from "@/types/region.type";
import { createBox } from "@lavaz/store";

interface RegionState {
	value: Region | undefined;
	label: string;
}

const initialState = {
	value: undefined,
	label: "Chọn miền",
} satisfies RegionState as RegionState;

export const regionBox = createBox(initialState, (set) => ({
	setValue: (value: Region | undefined) =>
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
