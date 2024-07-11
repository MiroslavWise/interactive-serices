import { create } from "zustand"

export const useOnline = create<IState>(() => ({
  users: [],
}))

export const dispatchOnlineUsers = (
  values: {
    email: string
    id: number
  }[],
) =>
  useOnline.setState(
    () => ({
      users: values,
    }),
    true,
  )

interface IState {
  users: {
    email: string
    id: number
  }[]
}
