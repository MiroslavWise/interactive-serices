import type { Dispatch, DispatchWithoutAction } from "react"
import type { ICreateGeneralOffers } from "./createGeneralOffers"

export type TSteps = "start" | "end"

export interface IUseCreateDiscussion extends ICreateGeneralOffers {
    emotion: string | undefined
    stepDiscussion: TSteps

    setStepDiscussion: Dispatch<TSteps>
    setEmotion: Dispatch<string>

    resetDiscussion: DispatchWithoutAction
}
