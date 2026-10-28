import { createBox } from "@lavaz/store";

interface SendMessageState {
  send: boolean;
}

const initialState = {
  send: true,
} satisfies SendMessageState as SendMessageState;

export const sendMessageBox = createBox(initialState, (set) => ({
  setSend: (send: boolean) => set((prev) => ({ ...prev, send })),
  resetSend: () => set(initialState),
})).create();
