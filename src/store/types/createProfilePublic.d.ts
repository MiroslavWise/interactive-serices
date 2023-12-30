import { Dispatch } from "react"

interface IStateProfilePublic {
    visibleProfilePublic: boolean
    isLeft?: boolean
    idUser?: number
}

export interface IAction {
    visible: boolean
    idUser?: number
    isLeft?: boolean
}

export type TActionDispatch = Dispatch<IAction>

interface IActionProfilePublic {
    dispatchProfilePublic: Dispatch<IAction>
}

export type TUseProfilePublic = IStateProfilePublic & IActionProfilePublic
