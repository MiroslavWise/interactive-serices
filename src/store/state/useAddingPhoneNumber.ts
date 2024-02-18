import { create } from "zustand"

export const useAddingPhoneNumber = create<{ visible: boolean }>(() => ({ visible: false }))

export const dispatchAddingPhoneNumber = (value: boolean) => useAddingPhoneNumber.setState(() => ({ visible: value }))
