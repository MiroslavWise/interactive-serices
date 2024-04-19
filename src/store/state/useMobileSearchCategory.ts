import { create } from "zustand"

export const useMobileSearchCategory = create<IStateMobileSearchCategory>(() => ({ visible: false }))

export const dispatchMobileSearchCategoryVisible = (value: boolean) =>
  useMobileSearchCategory.setState((_) => ({
    ..._,
    visible: value,
  }))

interface IStateMobileSearchCategory {
  visible: boolean
}
