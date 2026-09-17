import { createBox } from "@lavaz/store";

interface CustomerState {
	selected: string[];
	isSelectAll: boolean;
}

const initialState = {
	isSelectAll: false,
	selected: [],
} satisfies CustomerState as CustomerState;

export const customerBox = createBox(initialState, (set) => ({
	setSelected: (id: string) =>
		set((prev) => {
			const existingId = prev.selected.find((item) => item === id);
			let selected: string[] = [];
			if (existingId)
				selected = prev.selected.filter((item) => item !== existingId);
			else selected = [...prev.selected, id];

			return { ...prev, selected };
		}),
	setToggleSelectAll: () =>
		set((prev) => ({ ...prev, isSelectAll: !prev.isSelectAll })),
	setSelectAll: (ids: string[]) => set((prev) => ({ ...prev, selected: ids })),
	setIsSelectAll: (isSelectAll: boolean) =>
		set((prev) => ({ ...prev, isSelectAll })),
})).create();
