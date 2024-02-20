import type { Dispatch } from "react"

import { EnumProviderThreads } from "@/types/enum"

interface IStateMessagesType {
  type: EnumProviderThreads
}

interface IAction {
  type: EnumProviderThreads
}

interface IActionMessagesType {
  dispatchMessagesType: Dispatch<IAction>
}

export type TUseMessagesType = IStateMessagesType
