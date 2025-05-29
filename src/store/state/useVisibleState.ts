import { create } from "zustand"

import type { IUseVisibleExchanges } from "../types/useVisibleExchanges"
import { Dispatch } from "react"

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

  setPage(value) {
    if (value !== get().page) {
      set({ page: value })
    }
  },
  setVisible(value) {
    set({ isVisible: value })
  },
}))

export const dispatchPrevWelcomeModal = () =>
  useWelcomeModalState.setState((_) => (_.page > 1 ? { ..._, page: _.page - 1 } : { ..._ }), true)
export const dispatchNextWelcomeModal = () =>
  useWelcomeModalState.setState((_) => (_.page < 4 ? { ..._, page: _.page + 1 } : { ..._, isVisible: false }), true)

export interface IUseWelcomeModal {
  isVisible: boolean
  page: number

  setPage: Dispatch<number>
  setVisible: Dispatch<boolean>
}
