import { create } from "zustand"
import { TUseMessagesType } from "../types/createMessagesType"
import { TTypeProviderThreads } from "@/services/threads/types"

export const useMessagesType = create<TUseMessagesType>(() => ({
    type: "personal",
}))

export const dispatchMessagesType = (value: TTypeProviderThreads) => useMessagesType.setState((_) => ({ type: value }))
