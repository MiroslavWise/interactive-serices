import { Dispatch } from "react"

interface IStateProfilePublic {
    visibleProfilePublic: boolean
    idUser?: number
}

interface IAction {
    visible: boolean
    idUser?: number
}

interface IActionProfilePublic {
    dispatchProfilePublic: Dispatch<IAction>
}

export type TUseProfilePublic = IStateProfilePublic & IActionProfilePublic
