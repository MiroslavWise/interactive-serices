import { create } from "zustand"

export const useMenuMobileOnUser = create<IStateMenuMobileOnUser>(() => ({
  visible: false,
}))

export const dispatchOpenMenuMobileOnUser = () =>
  useMenuMobileOnUser.setState((_) => ({
    visible: true,
  }))

export const dispatchCloseMenuMobileOnUser = () =>
  useMenuMobileOnUser.setState((_) => ({
    visible: false,
  }))
interface IStateMenuMobileOnUser {
  visible: boolean
}
