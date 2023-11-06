import type { Dispatch } from "react"
import type { IUserResponse } from "@/services/users/types/usersService"

export interface IStateComplaintModal {
    visibleComplaint: boolean
    user?: IUserResponse
}

interface IAction {
    visible: boolean
    user?: IUserResponse
}

export interface IActionComplaintModal {
    dispatchComplaintModal: Dispatch<IAction>
}

export type TUseComplaintModal = IStateComplaintModal & IActionComplaintModal
