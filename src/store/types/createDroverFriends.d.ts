import type { Dispatch } from "react"

export interface IStateDroverFriends {
    visibleFriends: boolean
    type: TTypeFriends
}

export type TTypeFriends = "list" | "request"

interface IDispatch {
    visible?: boolean
    type?: TTypeFriends
}

export interface IActionDroverFriends {
    dispatchFriends: Dispatch<IDispatch>
}

export type TUseDroverFriends = IStateDroverFriends & IActionDroverFriends
