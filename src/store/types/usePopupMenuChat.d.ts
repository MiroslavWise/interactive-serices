import type { Dispatch, DispatchWithoutAction } from "react"

export interface IUsePopupMenuChat {
    isVisible: boolean

    setIsVisible: (value?: boolean) => void
}
