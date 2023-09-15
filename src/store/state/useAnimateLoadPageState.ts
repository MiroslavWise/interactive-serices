import { create } from "zustand"

import type { IUseAnimateLoadPageState } from "../types/useAnimateLoadPage"

export const useAnimateLoadPageState = create<IUseAnimateLoadPageState>(
    (set) => ({
        isAnimated: false,
        setIsAnimated(value) {
            set({ isAnimated: value })
        },
    }),
)
