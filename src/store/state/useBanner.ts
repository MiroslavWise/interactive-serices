import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const useBanner = create(
  persist<{ visible: boolean }>(
    () => ({
      visible: true,
    }),
    {
      name: "::banner-help::",
      storage: createJSONStorage(() => localStorage),
      version: 2,
    },
  ),
)

export const dispatchCloseBanner = () => useBanner.setState(() => ({ visible: false }), true)
