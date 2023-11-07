import { Dispatch } from "react"

interface IStateTermsOfUse {
    visibleRules: boolean
    visiblePolicy: boolean
}

interface IAction {
    visible: boolean
}

interface IActionTermsOfUse {
    dispatchRules: Dispatch<IAction>
    dispatchPolicy: Dispatch<IAction>
}

export type TUseTermsOfUse = IStateTermsOfUse & IActionTermsOfUse
