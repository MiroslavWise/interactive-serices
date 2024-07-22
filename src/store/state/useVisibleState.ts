import { create } from "zustand"

import type { IUseWelcomeModal } from "../types/useWelcomeModal"
import type { IUseVisibleExchanges } from "../types/useVisibleExchanges"

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
