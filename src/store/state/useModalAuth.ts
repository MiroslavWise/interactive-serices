import { create } from "zustand"

import type { IUseVisibleAndTypeAuthModalState, IAction } from "../types/useVisibleAndTypeAuthModalState"

export const useModalAuth = create<IUseVisibleAndTypeAuthModalState>(() => ({
    visible: false,
    type: null,
}))

export const dispatchAuthModal = ({ visible, type }: IAction) =>
    useModalAuth.setState((_) => ({
        visible: typeof visible !== "undefined" ? visible : _.visible,
        type: typeof type !== "undefined" ? type : _.type,
    }))
