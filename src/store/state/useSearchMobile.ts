import { create } from "zustand"

export const useSearchMobile = create<IStateSearchMobile>(() => ({
  visible: false,
}))

export const dispatchVisibleSearchMobile = (value: boolean) =>
  useSearchMobile.setState((_) => ({
    ..._,
    visible: value,
  }))

interface IStateSearchMobile {
  visible: boolean
}
