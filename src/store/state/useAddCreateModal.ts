import { create } from "zustand"

import type { IUseAddCreateModal } from "../types/useAddCreateModal"

export const useAddCreateModal = create<IUseAddCreateModal>((set, get) => ({
    typeAdd: undefined,
    isVisible: undefined,

    dispatchVisibleTypeCreateOptionals(props) {
        const { type, visible } = props ?? {}
        
        if (visible) {
            set({
                typeAdd: type,
                isVisible: visible,
            })
            return
        }

        if (!visible) {
            set({
                typeAdd: undefined,
                isVisible: false,
            })
                        return
        }
    },
}))
