import { createBox } from "@lavaz/store";

interface DatePickerState {
	date: Date;
}

const initialState = {
	date: new Date(),
} satisfies DatePickerState as DatePickerState;

export const DatePickerBox = createBox(initialState, (set) => ({
	setDate: (date: Date) => set((prev) => ({ ...prev, date })),
})).create();
