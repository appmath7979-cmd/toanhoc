import { GetCustomersReq } from "@/types/customer.type";
import { createBox } from "@lavaz/store";

interface CustomerPaginationState extends Omit<GetCustomersReq, "search" | "page"> { }

const initialState = {
  active: undefined,
  guest: "true",
  sort: undefined,
} satisfies CustomerPaginationState as CustomerPaginationState

export const customerPaginationBox = createBox(initialState, set => ({
  setActive: (active?: "true" | "false") => set(prev => ({ ...prev, active }))
})).create()