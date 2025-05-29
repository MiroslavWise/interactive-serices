import { create } from "zustand"

export const useVisibleFeedbackMobileCustomer = create<IStateVisibleFeedbackMobileCustomer>(() => ({ visible: false }))

export const dispatchVisibleFeedbackMobileCustomer = (value: boolean) =>
  useVisibleFeedbackMobileCustomer.setState(
    (_) => ({
      visible: value,
    }),
    true,
  )

interface IStateVisibleFeedbackMobileCustomer {
  visible: boolean
}
