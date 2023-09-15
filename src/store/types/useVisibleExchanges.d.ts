import type { Dispatch } from "react"

export type TExchanges = "current" | "completed"

export interface IUseVisibleExchanges {
    isVisible: boolean
    type: TExchanges | undefined

    setVisibleType: Dispatch<{ visible?: boolean; type?: TExchanges }>
}
