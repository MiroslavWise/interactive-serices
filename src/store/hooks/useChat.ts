import { shallow } from "zustand/shallow"

import { useChatState } from "../state/useChatState"

export const useChat = () => {
    return useChatState(
        (state) => ({
            currentChatId: state.currentChatId,
            setCurrentChat: state.setCurrentChat,
        }),
        shallow,
    )
}
