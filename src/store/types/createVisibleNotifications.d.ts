import type { Dispatch } from "react"

export interface IStateNotifications {
    visible: boolean
}

interface IAction {
    visible: boolean
}

export interface IActionNotifications {
    dispatchVisibleNotifications: Dispatch<IAction>
}

export type TUseVisibleNotifications = IStateNotifications &
    IActionNotifications
