import { create } from "zustand"

export const useAddingPhoneNumber = create<{ visible: boolean }>(() => ({ visible: false }))
export const useNumberConfirmation = create<{ visible: boolean; number?: string }>(() => ({ visible: false }))

export const dispatchAddingPhoneNumber = (value: boolean) => useAddingPhoneNumber.setState(() => ({ visible: value }))
export const dispatchNumberConfirmation = (visible: boolean, number?: string) =>
  useNumberConfirmation.setState(() => ({
    visible,
    number,
  }))
