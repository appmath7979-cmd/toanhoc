import { createStore } from "@lavaz/store";
import { datePickerBox } from "./boxes/date-picker.box";
import { sidebarBox } from "./boxes/side-bar.box";
import { themeBox } from "./boxes/theme.box";

export const store = createStore({
	datePicker: datePickerBox,
	sidebar: sidebarBox,
	toggleTheme: themeBox,
});
