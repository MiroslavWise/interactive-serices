import type { Dispatch } from "react"

import type { TTypeProviderThreads } from "@/services/threads/types"

interface IStateMessagesType {
    type: TTypeProviderThreads
}

interface IAction {
    type: TTypeProviderThreads
}

interface IActionMessagesType {
    dispatchMessagesType: Dispatch<IAction>
}

export type TUseMessagesType = IStateMessagesType & IActionMessagesType
