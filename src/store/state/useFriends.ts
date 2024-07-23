import { create } from "zustand"

export const useFriends = create<IState>(() => ({
  visible: false,
}))

export const dispatchOpenFriends = (value: number) =>
  useFriends.setState(
    () => ({
      visible: true,
      id: value,
    }),
    true,
  )

export const dispatchCloseFriends = () =>
  useFriends.setState(
    () => ({
      visible: false,
      id: undefined,
    }),
    true,
  )

interface IState {
  visible: boolean
  id?: number
}
