import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useCollapseServices = create(
  persist<{ visible: boolean }>(() => ({ visible: false }), {
    name: "collapse-services",
    storage: createJSONStorage(() => sessionStorage),
  }),
)

export const dispatchCollapseServices = () => useCollapseServices.setState((_) => ({ visible: !_.visible }))
