import type { Dispatch, DispatchWithoutAction } from "react"
import type { IBarterResponse } from "@/services/barters/types"
import type { IUserResponse } from "@/services/users/types"

export interface IStateCompletionTransaction {
    visible: boolean
    dataBarter?: IBarterResponse
    dataUser?: IUserResponse
    threadId?: number | string
    cd?: () => any
}

export interface IDispatchCompletionTransaction {
    visible: boolean
    dataBarter?: IBarterResponse
    dataUser?: IUserResponse
    cd?: () => any
    threadId?: number | string
}

export interface IActionCompletionTransaction {
    dispatchCompletion: Dispatch<IDispatchCompletionTransaction>
}

export type TUseCompletionTransaction = IStateCompletionTransaction & IActionCompletionTransaction
