import { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import { TTypeProvider } from "@/services/file-upload/types"
import type { Dispatch, DispatchWithoutAction } from "react"

export type TAddCreate = "offer" | "request" | "alert" | "discussion"

export interface IValuesVisibleType {
    type: TTypeProvider
    visible?: boolean
}

export interface IUseAddCreateModal {
    typeAdd?: TTypeProvider
    isVisible: boolean
    addressInit?: IPostAddress

    dispatchVisibleTypeCreateOptionals: Dispatch<IValuesVisibleType | void>
}
