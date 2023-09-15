import type { Dispatch, DispatchWithoutAction } from "react"

export interface IUseWelcomeModal {
    isVisible: boolean
    page: number

    setPrev: DispatchWithoutAction
    setNext: DispatchWithoutAction
    setPage: Dispatch<number>
    setVisible: Dispatch<boolean>
}

export type typeKeysUseWelcomeModal = keyof IUseWelcomeModal
