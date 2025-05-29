import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useCollapseServices = create(
  persist<{ visible: boolean }>(() => ({ visible: false }), {
    name: "collapse-services",
    storage: createJSONStorage(() => sessionStorage),
  }),
)

export const useCollapsePersonalScreen = create(
  persist<{ visible: boolean }>(() => ({ visible: false }), {
    name: "collapse-personal-screen",
    storage: createJSONStorage(() => sessionStorage),
  }),
)

export const dispatchCollapseServicesTrue = () => useCollapseServices.setState((_) => ({ visible: false }))
export const dispatchCollapseServices = () => useCollapseServices.setState((_) => ({ visible: !_.visible }))
export const dispatchCollapsePersonalScreen = () => useCollapsePersonalScreen.setState((_) => ({ visible: !_.visible }))
