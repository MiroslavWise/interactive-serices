import { create } from "zustand"

import type { IUseVisibleBannerNewServicesState, IUseVisibleNewServiceBarterRequests } from "../types/useVisibleBannerNewServicesState"
import type { IUseWelcomeModal } from "../types/useWelcomeModal"
import type { IUseUpdateProfileState } from "../types/useUpdateProfile"
import type { IUsePopupMenuChat } from "../types/usePopupMenuChat"
import type { IUseVisibleExchanges } from "../types/useVisibleExchanges"

export const useVisibleBannerNewServicesState = create<IUseVisibleBannerNewServicesState>((set, get) => ({
  isVisibleNewServicesBanner: false,
  dispatchNewServicesBanner(value) {
    set({
      isVisibleNewServicesBanner: value,
    })
  },
}))

export const dispatchNewServicesBanner = (value: boolean) =>
  useVisibleBannerNewServicesState.setState((_) => ({
    ..._,
    isVisibleNewServicesBanner: value,
  }))

export const useVisibleNewServiceBarterRequests = create<IUseVisibleNewServiceBarterRequests>((set, get) => ({
  isVisibleNewServiceBarterRequests: false,
  dispatchNewServiceBarterRequests(value) {
    set({ isVisibleNewServiceBarterRequests: value })
  },
}))

export const useVisibleExchangesState = create<IUseVisibleExchanges>((set, get) => ({
  isVisible: false,
  type: undefined,

  dispatchExchanges({ visible, type }) {
    set({
      isVisible: typeof visible !== "undefined" ? visible : get().isVisible,
      type: typeof type !== "undefined" ? type : get().type,
    })
  },
}))

export const useWelcomeModalState = create<IUseWelcomeModal>((set, get) => ({
  isVisible: false,
  page: 1,

  setPrev() {
    if (get().page > 1) set({ page: get().page - 1 })
  },
  setNext() {
    if (get().page < 4) {
      set({ page: get().page + 1 })
    } else {
      set({ isVisible: false })
    }
  },
  setPage(value) {
    if (value !== get().page) {
      set({ page: value })
    }
  },
  setVisible(value) {
    set({ isVisible: value })
  },
}))

export const usePopupMenuChatState = create<IUsePopupMenuChat>((set, get) => ({
  isVisible: false,

  setIsVisible(value) {
    set({
      isVisible: typeof value === "undefined" ? !get().isVisible : value,
    })
  },
}))
