import { create } from "zustand"

export const useOpenDrawer = create<IState>(() => ({ visible: false }))

export const dispatchOpenDrawer = () => useOpenDrawer.setState((_) => ({ visible: !_.visible }), true)
export const dispatchCloseDrawer = () => useOpenDrawer.setState((_) => ({ visible: false }), true)

interface IState {
  visible: boolean
}
