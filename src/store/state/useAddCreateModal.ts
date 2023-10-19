import { create } from "zustand"

import type { IUseAddCreateModal } from "../types/useAddCreateModal"

export const useAddCreateModal = create<IUseAddCreateModal>((set, get) => ({
    typeAdd: undefined,
    isVisible: undefined,

    dispatchVisibleTypeCreateOptionals(props) {
        const { type, visible } = props ?? {}
        const getVisible = get().isVisible
        if (visible && type && !getVisible) {
            set({
                typeAdd: type,
                isVisible: visible,
            })
            return
        }

        if (!visible) {
            set({ isVisible: false })
            setTimeout(() => {
                set({ typeAdd: undefined })
            }, 250)
            setTimeout(() => {
                set({ isVisible: undefined })
            }, 260)
            return
        }
    },
}))
