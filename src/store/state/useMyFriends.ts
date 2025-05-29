import { create } from "zustand"

export const useMyFriends = create<{ visible: boolean }>(() => ({
  visible: false,
}))

export const dispatchMyFriends = () => useMyFriends.setState((_) => ({ visible: !_.visible }), true)
