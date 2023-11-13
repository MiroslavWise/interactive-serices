import { create } from "zustand"
import { IUseVisibleAndTypeAuthModalState } from "../types/useVisibleAndTypeAuthModalState"

export const useModalAuth = create<IUseVisibleAndTypeAuthModalState>(
    (set, get) => ({
        visible: false,
        type: null,
        setVisibleAndType({ visible, type }) {
            set({
                visible:
                    typeof visible !== "undefined" ? visible : get().visible,
                type: typeof type !== "undefined" ? type : get().type,
            })
        },
    }),
)
