import { create } from "zustand"

export const useVisibleAbout = create<IUseVisibleAbout>((set, get) => ({
  visible: false,
}))

export const dispatchVisibleAbout = (value: boolean) =>
  useVisibleAbout.setState(
    () => ({
      visible: value,
    }),
    true,
  )

interface IUseVisibleAbout {
  visible: boolean
}
