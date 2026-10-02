import { createStore } from "@lavaz/store";
import { customerActionBox } from "./boxes/customer-action.box";

export const store = createStore({
	customerAction: customerActionBox,
});
