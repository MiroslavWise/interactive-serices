import { create } from "zustand"

import type { IUseAnimateLoadPageState } from "../types/useAnimateLoadPage"

export const useAnimateLoadPageState = create<IUseAnimateLoadPageState>(
    (set, get) => ({
        isAnimated: false,
        setIsAnimated(value) {
            if (get().isAnimated !== value) {
                set({ isAnimated: value })
            }
        },
    }),
)
