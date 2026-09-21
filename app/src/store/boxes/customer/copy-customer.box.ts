import { createCustomerDefault } from "@/libs/helper/create-customer-default";
import { CreateCustomer } from "@/schema/customer.schema";
import { createBox } from "@lavaz/store";

export interface CopyCustomerState {
	customerId?: string;
	data: CreateCustomer;
	isCopy: boolean;
	isEdit: boolean;
}

const initialState = {
	customerId: "",
	data: createCustomerDefault,
	isCopy: false,
	isEdit: false,
} satisfies CopyCustomerState as CopyCustomerState;

export const copyCustomerBox = createBox(initialState, (set) => ({
	copy: (data: CreateCustomer, customerId?: string) =>
		set((prev) => ({ ...prev, data, customerId })),
	setIsCopy: () => set((prev) => ({ ...prev, isCopy: true })),
	setIsEdit: () => set((prev) => ({ ...prev, isEdit: true })),
	setDefault: () => set((prev) => ({ ...prev, ...initialState })),
})).create();
