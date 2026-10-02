import { createBox } from "@lavaz/store";

interface CustomerActionState {
  customerId: string;
  mode?: "copy" | "edit";
}

const initialState = {
  customerId: "",
  mode: undefined,
} satisfies CustomerActionState as CustomerActionState;

export const customerActionBox = createBox(initialState, (set) => ({
  onCopy: (customerId: string) =>
    set((prev) => ({ ...prev, customerId, mode: "copy" })),
  onEdit: (customerId: string) =>
    set((prev) => ({ ...prev, customerId, mode: "edit" })),
  onFinish: () => set(initialState),
})).create();
