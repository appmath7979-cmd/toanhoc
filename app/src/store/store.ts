import { createStore } from "@lavaz/store";
import { datePickerBox } from "./boxes/date-picker.box";
import { sidebarBox } from "./boxes/side-bar.box";
import { themeBox } from "./boxes/theme.box";
import { customerBox } from "./boxes/customer/customer.box";
import { copyCustomerBox } from "./boxes/customer/copy-customer.box";
import { customerPaginationBox } from "./boxes/customer/customer-pagination.box";

export const store = createStore({
	datePicker: datePickerBox,
	sidebar: sidebarBox,
	toggleTheme: themeBox,
	customer: customerBox,
	copyCustomer: copyCustomerBox,
	customerPagination: customerPaginationBox,
});
