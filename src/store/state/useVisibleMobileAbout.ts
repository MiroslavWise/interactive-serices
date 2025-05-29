import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { type IUseVisibleMobileAbout } from "../types/createVisibleMobileAbout"

export const useVisibleMobileAbout = create(
  persist<IUseVisibleMobileAbout>(
    () => ({
      visible: true,
    }),
    {
      name: "mobile-about",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const dispatchVisibleMobileAbout = (value: boolean) =>
  useVisibleMobileAbout.setState(
    () => ({
      visible: value,
    }),
    true,
  )
