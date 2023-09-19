import type { Dispatch, DispatchWithoutAction } from "react"
import type { TProviderOffer } from "@/services/types/general"

export type TSteps = "start" | "end"

export interface IUseCreateRequest {
    text: string
    selected:
        | {
              id: number
              slug: TProviderOffer
          }
        | undefined
    stepRequest: TSteps

    setStepRequest: Dispatch<TSteps>
    setText: Dispatch<string>
    setValueCategory: Dispatch<{
        id: number
        slug: TProviderOffer
    }>

    resetRequest: DispatchWithoutAction
}
