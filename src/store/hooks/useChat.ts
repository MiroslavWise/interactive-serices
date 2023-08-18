import { shallow } from "zustand/shallow"

import { useChatState } from "../state/useChatState"

export const useChat = () => {
  const context = useChatState(state => ({
    currentChatId: state.currentChatId,
    setCurrentChat: state.setCurrentChat,
  }), shallow)

  return context
}