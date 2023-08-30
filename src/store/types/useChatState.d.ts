import type { Dispatch, DispatchWithoutAction } from "react"

export interface IUseChat {
    currentChatId: number | undefined

    setCurrentChat: Dispatch<number | undefined>
}
