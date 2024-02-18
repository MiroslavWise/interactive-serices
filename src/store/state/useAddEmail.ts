import { create } from "zustand"

export const useAddEmail = create<{ visible: boolean }>(() => ({ visible: false }))

export const dispatchAddEmail = (visible: boolean) => useAddEmail.setState(() => ({ visible }))
