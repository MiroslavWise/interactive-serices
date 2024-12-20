import { create } from "zustand"
import { LngLatBounds } from "ymaps3"
import { persist, createJSONStorage } from "zustand/middleware"

export const useBounds = create(
  persist<IStateBounds>(() => ({}), {
    name: "bounds",
    storage: createJSONStorage(() => localStorage),
  }),
)

export const dispatchBounds = (bounds: number[][] | undefined | LngLatBounds) =>
  useBounds.setState((_) => ({
    bounds: bounds ? bounds : _.bounds,
  }))

interface IStateBounds {
  bounds?: number[][] | LngLatBounds
}
