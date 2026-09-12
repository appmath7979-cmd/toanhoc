import { createBox } from "@lavaz/store";

interface DatePickerState {
	date: Date;
}

const initalState = {
	date: new Date(),
} satisfies DatePickerState as DatePickerState;

export const datePickerBox = createBox(initalState, (set) => ({
	setDate: (date: Date) => set((prev) => ({ ...prev, date })),
})).create();
