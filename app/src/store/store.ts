import { createStore } from "@lavaz/store";
import { customerActionBox } from "./boxes/customer-action.box";
import { regionBox } from "./boxes/region.box";

export const store = createStore({
	customerAction: customerActionBox,
	region: regionBox,
});
