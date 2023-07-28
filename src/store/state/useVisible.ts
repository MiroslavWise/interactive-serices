import { create } from "zustand"

import type { IUseVisibleBannerNewServicesState } from "../types/useVisibleBannerNewServicesState"
import type { IUseVisibleAndTypeAuthModalState } from "../types/useVisibleAndTypeAuthModalState"



export const useVisibleBannerNewServicesState = create<IUseVisibleBannerNewServicesState>(
  (set, get) => ({
    isVisibleNewServicesBanner: false,
    setIsVisibleNewServicesBanner(value) {
      set({
        isVisibleNewServicesBanner: value,
      })
    },
  })
)

export const useVisibleAndTypeAuthModalState = create<IUseVisibleAndTypeAuthModalState>(
  (set, get) => ({
    visible: false,
    type: null,
    setVisibleAndType({ visible, type }) {
      set({
        visible: typeof visible !== "undefined" ? visible : get().visible,
        type: typeof type !== "undefined" ? type : get().type,
      })
    },
  })
)