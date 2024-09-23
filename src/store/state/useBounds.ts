import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export const useBounds = create(
  persist<IStateBounds>(() => ({}), {
    name: "bounds",
    storage: createJSONStorage(() => localStorage),
  }),
)

export const dispatchBounds = (bounds: number[][] | undefined) =>
  useBounds.setState((_) => ({
    bounds: bounds ? bounds : _.bounds,
  }))

interface IStateBounds {
  bounds?: number[][]
}
