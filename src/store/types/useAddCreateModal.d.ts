import type { Dispatch, DispatchWithoutAction } from "react"

export type TAddCreate = "offer" | "request" | "alert" | "discussion"

export interface IValuesVisibleType {
    type?: TAddCreate
    visible?: boolean
}

export interface IUseAddCreateModal {
    typeAdd: TAddCreate | undefined
    isVisible: boolean

    setVisibleAndType: Dispatch<IValuesVisibleType | void>
}
