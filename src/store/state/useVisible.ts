import { create } from "zustand"

import type { IUseVisibleBannerNewServicesState } from "../types/useVisibleBannerNewServicesState"
import type { IUseVisibleAndTypeAuthModalState } from "../types/useVisibleAndTypeAuthModalState"
import type { IUseVisibleModalBarter } from "../types/useVisibleModalBarter"



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

export const useVisibleModalBarterState = create<IUseVisibleModalBarter>(
  (set, get) => ({
    isVisible: true,
    dataProfile: undefined,

    setIsVisibleBarter({isVisible, dataProfile}) {
      set({
        isVisible: isVisible,
      })
      if (dataProfile !== undefined) {
        set({
          dataProfile: dataProfile,
        })
      } else {
        setTimeout(() => {
          set({
            dataProfile: undefined,
          })
        }, 350)
      }
    },
  })
)