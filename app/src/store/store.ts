import { createStore } from "@lavaz/store";
import { createLimitBox } from "./boxes/create-limit.box";
import { customerActionBox } from "./boxes/customer-action.box";
import { datePickerBox } from "./boxes/date-picker.box";
import { regionBox } from "./boxes/region.box";
import { rewardBox } from "./boxes/reward.box";
import { sendMessageBox } from "./boxes/send-message.box";

export const store = createStore({
  customerAction: customerActionBox,
  region: regionBox,
  datePicker: datePickerBox,
  createLimit: createLimitBox,
  sendMessage: sendMessageBox,
  reward: rewardBox,
});
