import { create } from "zustand"

export const useOutAccount = create<{ visible: boolean }>(() => ({ visible: false }))

export const dispatchOutAccount = (value: boolean) => useOutAccount.setState(() => ({ visible: value }))
