import { createStore } from "@lavaz/store";
import { createLimitBox } from "./boxes/create-limit";
import { customerActionBox } from "./boxes/customer-action.box";
import { datePickerBox } from "./boxes/date-picker.box";
import { regionBox } from "./boxes/region.box";

export const store = createStore({
  customerAction: customerActionBox,
  region: regionBox,
  datePicker: datePickerBox,
  createLimit: createLimitBox,
});
