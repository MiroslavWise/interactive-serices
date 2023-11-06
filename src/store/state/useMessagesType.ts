import { create } from "zustand"
import { TUseMessagesType } from "../types/createMessagesType"

export const useMessagesType = create<TUseMessagesType>((set, get) => ({
    type: "personal",

    dispatchMessagesType({ type }) {
        set({ type: type })
    },
}))
