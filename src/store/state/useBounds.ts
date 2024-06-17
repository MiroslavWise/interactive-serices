import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { TUseBounds } from "../types/createBounds"

export const useBounds = create(
  persist<TUseBounds>(() => ({}), {
    name: "bounds",
    storage: createJSONStorage(() => localStorage),
  }),
)

export const dispatchBounds = (bounds: number[][] | undefined) =>
  useBounds.setState((_) => ({
    bounds: bounds ? bounds : _.bounds,
  }))
