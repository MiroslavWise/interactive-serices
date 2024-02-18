import { create } from "zustand"

export const useCheckTheMail = create<{ visible: boolean; email?: string }>(() => ({ visible: false }))

export const dispatchCheckTheMail = (visible: boolean, email?: string) => useCheckTheMail.setState(() => ({ visible }))
