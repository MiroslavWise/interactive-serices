import { Dispatch } from "react"

interface IStateBounds {
    bounds?: number[][]
}

interface IAction {
    bounds?: number[][]
}

interface IActionBounds {
    dispatchBounds: Dispatch<IAction>
}

export type TUseBounds = IStateBounds & IActionBounds
