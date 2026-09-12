import { createBox } from "@lavaz/store";

interface SidebarState {
	isExpand: boolean;
}

const initialState = {
	isExpand: false,
} satisfies SidebarState as SidebarState;

export const sidebarBox = createBox(initialState, (set) => ({
	setExpand: () => set((prev) => ({ ...prev, isExpand: !prev.isExpand })),
})).create();
