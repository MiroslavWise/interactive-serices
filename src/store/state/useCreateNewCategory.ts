import { create } from "zustand"

export const useCreateNewCategory = create<IStateCreateNewCategory>(() => ({
  visible: false,
}))

export const dispatchVisibleCreateNewCategory = (value: boolean) =>
  useCreateNewCategory.setState((_) => ({
    visible: value,
  }))

interface IStateCreateNewCategory {
  visible: boolean
}
