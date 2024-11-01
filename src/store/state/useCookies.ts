import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { NAME_STORAGE_COOKIES } from "@/config/persist-name"

export const useCookies = create(
  persist<IStateCookies>(() => ({ isUse: false, visible: false }), {
    name: NAME_STORAGE_COOKIES,
    storage: createJSONStorage(() => localStorage),
    version: 3,
  }),
)

export const dispatchCookiesVisible = () => useCookies.setState((_) => ({ ..._, visible: true }), true)
export const dispatchCookies = () => useCookies.setState((_) => ({ ..._, isUse: true, visible: false }), true)

interface IStateCookies {
  isUse: boolean
  visible: boolean
}
