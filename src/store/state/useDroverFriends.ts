import { create } from "zustand"

import { TUseDroverFriends } from "../types/createDroverFriends"

export const useDroverFriends = create<TUseDroverFriends>((set, get) => ({
  visibleFriends: false,
  type: "list",

  dispatchFriends({ visible, type }) {
    if (type) {
      set({ type: type })
    }
    if (typeof visible !== "undefined") {
      set({ visibleFriends: !!visible })
    }
  },
}))
