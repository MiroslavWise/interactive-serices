import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useAdvertisingBanner = create(
  persist<IStateUseAdvertisingBanner>(
    () => ({
      visible: false,
    }),
    {
      name: "::advertising-banner::",
      storage: createJSONStorage(() => sessionStorage),
      version: 0.3,
    },
  ),
)

export const dispatchCloseAdvertisingBanner = () => useAdvertisingBanner.setState((_) => ({ visible: false }))

interface IStateUseAdvertisingBanner {
  visible: boolean
}
