import { create } from "zustand"
import type { TUseVisibleNotifications } from "../types/createVisibleNotifications"

export const useVisibleNotifications = create<TUseVisibleNotifications>((set, get) => ({
  visible: false,
}))

export const dispatchVisibleNotifications = (value: boolean) => {
  useVisibleNotifications.setState((_) => ({ visible: value }))
}
