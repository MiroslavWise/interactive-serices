import { Dispatch } from "react"

interface IStateProfilePublic {
    visibleProfilePublic: boolean
    isLeft?: boolean
    idUser?: number
}

interface IAction {
    visible: boolean
    idUser?: number
    isLeft?: boolean
}

interface IActionProfilePublic {
    dispatchProfilePublic: Dispatch<IAction>
}

export type TUseProfilePublic = IStateProfilePublic & IActionProfilePublic
