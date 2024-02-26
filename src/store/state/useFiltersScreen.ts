import { create } from "zustand"

export const useFiltersScreen = create<IActiveFilters>(() => ({
  visible: false,
  activeFilters: [],
}))

interface IActiveFilters {
  visible: boolean
  activeFilters: number[]
}

export const dispatchActiveFilterScreen = () => useFiltersScreen.setState((_) => ({ ..._, visible: !_.visible }))
export const dispatchDataFilterScreen = (values: number[]) =>
  useFiltersScreen.setState((_) => ({ ..._, activeFilters: values.sort((a, b) => a - b) }))
