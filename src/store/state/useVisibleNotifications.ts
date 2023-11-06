import { create } from "zustand"
import type { TUseVisibleNotifications } from "../types/createVisibleNotifications"

export const useVisibleNotifications = create<TUseVisibleNotifications>(
    (set, get) => ({
        visible: false,

        dispatchVisibleNotifications({ visible }) {
            set({ visible: visible })
        },
    }),
)
