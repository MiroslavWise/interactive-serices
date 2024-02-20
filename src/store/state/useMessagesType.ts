import { create } from "zustand"

import { EnumProviderThreads } from "@/types/enum"
import { TUseMessagesType } from "../types/createMessagesType"

export const useMessagesType = create<TUseMessagesType>(() => ({
  type: EnumProviderThreads.PERSONAL,
}))

export const dispatchMessagesType = (value: EnumProviderThreads) => useMessagesType.setState((_) => ({ type: value }))
