import type { Dispatch, DispatchWithoutAction } from "react"

type TTypeInform = "register" | "feedback"

interface IStateDataConfirmationPopUp {
    visibleDataConfirmation: boolean
    type?: TTypeInform
    nameFeedback?: string
}

interface IActionDataConfirmationPopUp {
    dispatchDataConfirmation: Dispatch<{
        visible: boolean
        type?: TTypeInform
        nameFeedback?: string
    }>
}

export type TUseDataConfirmationPopUp = IStateDataConfirmationPopUp &
    IActionDataConfirmationPopUp
