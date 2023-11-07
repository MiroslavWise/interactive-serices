import { create } from "zustand"
import type { TUseTermsOfUse } from "../types/createTermsOfUse"

export const useTermsOfUse = create<TUseTermsOfUse>((set, get) => ({
    visiblePolicy: false,
    visibleRules: false,
    dispatchPolicy({ visible }) {
        set({ visiblePolicy: visible })
    },
    dispatchRules({ visible }) {
        set({ visibleRules: visible })
    },
}))
