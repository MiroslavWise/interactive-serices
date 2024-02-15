import { create } from "zustand"

export const useDeleteUser = create<{ visible: boolean }>(() => ({
  visible: false,
}))

export const dispatchDeleteUser = (value: boolean) => useDeleteUser.setState(() => ({ visible: value }))
