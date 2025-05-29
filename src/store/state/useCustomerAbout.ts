import { create } from "zustand"

export const useCustomerAbout = create<IStateCustomerAbout>(() => ({
  visible: false,
}))

export const dispatchOpenCustomerAbout = () =>
  useCustomerAbout.setState(
    (_) => ({
      visible: true,
    }),
    true,
  )

export const dispatchCloseCustomerAbout = () =>
  useCustomerAbout.setState(
    (_) => ({
      visible: false,
    }),
    true,
  )

interface IStateCustomerAbout {
  visible: boolean
}
