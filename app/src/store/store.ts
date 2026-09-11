import { createStore } from "@lavaz/store";
import { DatePickerBox } from "./boxes/date-picker.box";

export const store = createStore({
	datePicker: DatePickerBox,
});
