import { create } from "zustand"

export const useSearchFilters = create<IStateSearchFilters>(() => ({
  value: "",
  id: null,
  visible: false,
}))

export const dispatchVisibleSearchFilters = (value: boolean) =>
  useSearchFilters.setState((_) => ({
    ..._,
    visible: value,
  }))

export const dispatchValueSearchFilters = (value: string, id: number | null) =>
  useSearchFilters.setState((_) => ({
    ..._,
    value: value.trim(),
    id: id,
  }))

interface IStateSearchFilters {
  value: string
  visible: boolean
  id: null | number
}
