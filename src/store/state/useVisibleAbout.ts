import { create } from "zustand"

import type { IUseVisibleAbout } from "../types/createVisibleAbout"

export const useVisibleAbout = create<IUseVisibleAbout>((set, get) => ({
    visible: false,

    dispatchVisibleAbout(value) {
        set({ visible: value })
    },
}))
