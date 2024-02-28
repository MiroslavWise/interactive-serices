import { create } from "zustand"

export const useInitiatedBarter = create<IStateInitiatedBarter>(() => ({
  visible: false,
}))

export const dispatchInitiatedBarter = (value: boolean) =>
  useInitiatedBarter.setState((_) => ({
    visible: value,
  }))

interface IStateInitiatedBarter {
  visible: boolean
}
