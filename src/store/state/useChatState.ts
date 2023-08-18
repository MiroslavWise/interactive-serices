import { create } from "zustand"

import type { IUseChat } from "../types/useChatState"





export const useChatState = create<IUseChat>(
  (set, get) => ({
    currentChatId: undefined,

    setCurrentChat(value) {
      set({ currentChatId: value })
    },
  })
)