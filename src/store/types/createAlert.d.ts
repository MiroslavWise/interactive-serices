import type { Dispatch, DispatchWithoutAction } from "react"
import type { ICreateGeneralOffers } from "./createGeneralOffers"

export type TSteps = "start" | "end"

export interface IUseCreateAlert extends ICreateGeneralOffers {
    emotion: string | undefined
    stepAlert: TSteps
    
    setStepAlert: Dispatch<TSteps>
    setEmotion: Dispatch<string>

    resetAlert: DispatchWithoutAction
}
