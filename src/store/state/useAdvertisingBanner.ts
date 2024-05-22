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
      version: 0.1,
    },
  ),
)

export const dispatchCloseAdvertisingBanner = () => useAdvertisingBanner.setState((_) => ({ visible: false }))

interface IStateUseAdvertisingBanner {
  visible: boolean
}
