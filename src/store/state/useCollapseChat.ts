import { create } from "zustand"

export const useCollapseChat = create<IState>(() => ({ collapse: false }))

export const dispatchCollapseChat = () => useCollapseChat.setState((_) => ({ collapse: !_.collapse }), true)

interface IState {
  collapse: boolean
}
