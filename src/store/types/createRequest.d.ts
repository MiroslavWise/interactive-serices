import type { Dispatch, DispatchWithoutAction } from "react"
import type { TProviderOffer } from "@/services/types/general"
import { ICreateGeneralOffers } from "./createGeneralOffers"

export type TSteps = "start" | "end"

export interface IUseCreateRequest extends ICreateGeneralOffers {
    selected:
        | {
              id: number
              slug: TProviderOffer
          }
        | undefined
    stepRequest: TSteps

    setStepRequest: Dispatch<TSteps>
    setValueCategory: Dispatch<{
        id: number
        slug: TProviderOffer
    }>

    resetRequest: DispatchWithoutAction
}
