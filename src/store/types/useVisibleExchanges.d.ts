import type { Dispatch } from "react"
import type { TTypeStatusBarter } from "@/services/file-upload/types"

export interface IUseVisibleExchanges {
    isVisible: boolean
    type?: TTypeStatusBarter

    setVisibleType: Dispatch<{ visible?: boolean; type?: TExchanges }>
}
