import { createCustomerDefault } from "@/libs/helper/create-customer-default";
import { CreateCustomer } from "@/schema/customer.schema";
import { createBox } from "@lavaz/store";

const initialState = {
	...createCustomerDefault,
} satisfies CreateCustomer as CreateCustomer;

export const copyCustomerBox = createBox(initialState, (set) => ({
	copy: (data: CreateCustomer) => set((prev) => ({ ...prev, ...data })),
})).create();
