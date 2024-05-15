import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const useCookies = create(
  persist<IStateCookies>(() => ({ isUse: false, visible: false }), {
    name: "::--cookies--::",
    storage: createJSONStorage(() => localStorage),
    version: 3,
  }),
)

export const dispatchCookiesVisible = (value: boolean) => useCookies.setState((_) => ({ ..._, visible: value }))
export const dispatchCookies = () => useCookies.setState((_) => ({ ..._, isUse: true, visible: false }))

interface IStateCookies {
  isUse: boolean
  visible: boolean
}
