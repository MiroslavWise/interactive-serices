import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useAdvertisingBanner = create(
  persist<IStateUseAdvertisingBanner>(
    () => ({
      visible: true,
    }),
    {
      name: "::advertising-banner::",
      storage: createJSONStorage(() => sessionStorage),
      version: 1.0,
    },
  ),
)

export const dispatchCloseAdvertisingBanner = () => useAdvertisingBanner.setState((_) => ({ visible: false }))

interface IStateUseAdvertisingBanner {
  visible: boolean
}
