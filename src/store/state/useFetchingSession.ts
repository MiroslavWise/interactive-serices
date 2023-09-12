import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { IUseFetchingSession } from "../types/useFetchingSession"

export const useFetchingSession = create(
    persist<IUseFetchingSession>(
        (set, get) => ({
            offersCategories: false,
            getFetchingOffersCategories(value) {
                set({ offersCategories: value })
            },
        }),
        {
            name: "fetching",
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
