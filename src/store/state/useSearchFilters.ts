import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useSearchFilters = create(
  persist<IStateSearchFilters>(
    () => ({
      value: "",
      id: null,
      visible: false,
      history: [],
    }),
    {
      name: "search-history",
      partialize: (state) =>
        ({
          history: state.history,
        } as IStateSearchFilters),
    },
  ),
)

export const dispatchVisibleSearchFilters = (value: boolean) =>
  useSearchFilters.setState((_) => ({
    ..._,
    visible: value,
  }))

export const dispatchValueSearchFilters = (value: string, id: number | null) =>
  useSearchFilters.setState((_) => {
    const history = !!value && value?.length > 3 ? [..._.history?.filter((item) => item !== value), value] : [..._.history]
    return {
      ..._,
      value: value.trim(),
      id: id,
      history: history,
    }
  })

export const dispatchClearSearchFilters = () => useSearchFilters.setState((_) => ({ ..._, history: [] }))
interface IStateSearchFilters {
  value: string
  visible: boolean
  id: null | number
  history: string[]
}
