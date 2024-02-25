import { create } from "zustand"
import type { TUseFilterMap } from "../types/createFilterMap"

export const useFilterMap = create<TUseFilterMap>(() => ({ idsNumber: [] }))

export const dispatchFilterMap = (value: number) =>
  useFilterMap.setState((state) => {
    const array = state.idsNumber

    if (array.includes(value)) {
      return {
        idsNumber: array.filter((item) => item !== value),
      }
    } else {
      return {
        idsNumber: [...array, value].sort((a, b) => a - b),
      }
    }
  })
