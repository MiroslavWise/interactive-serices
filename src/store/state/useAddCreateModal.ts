import { create } from "zustand"

import type { IUseAddCreateModal } from "../types/useAddCreateModal"

export const useAddCreateModal = create<IUseAddCreateModal>((set, get) => ({
    typeAdd: undefined,
    isVisible: false,

    setVisibleAndType(props) {
        const { type, visible } = props ?? {}
        if (visible && type) {
            set({
                typeAdd: type,
                isVisible: visible,
            })
        }

        if (!visible) {
            set({ isVisible: false })
            setTimeout(() => {
                set({ typeAdd: undefined })
            }, 350)
        }
    },
}))
