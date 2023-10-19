import type { Dispatch, DispatchWithoutAction } from "react"
import type { IBarterResponse } from "@/services/barters/types"
import type { IUserResponse } from "@/services/users/types/usersService"

export interface IStateCompletionTransaction {
    visible: boolean
    dataBarter?: IBarterResponse
    dataUser?: IUserResponse
}

interface IDispatchCompletionTransaction {
    visible: boolean
    dataBarter?: IBarterResponse
    dataUser?: IUserResponse
    cd?: DispatchWithoutAction
}

export interface IActionCompletionTransaction {
    dispatchCompletion: Dispatch<IDispatchCompletionTransaction>
}

export type TUseCompletionTransaction = IStateCompletionTransaction &
    IActionCompletionTransaction
