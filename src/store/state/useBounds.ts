import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { TUseBounds } from "../types/createBounds"

export const useBounds = create(
    persist<TUseBounds>(
        (set, get) => ({
            dispatchBounds({ bounds }) {
                if (bounds) {
                    set({ bounds })
                }
            },
        }),
        {
            name: "auth",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
