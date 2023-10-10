import type { Dispatch, DispatchWithoutAction } from "react"
import type { TProviderOffer } from "@/services/types/general"
import { ICreateGeneralOffers } from "./createGeneralOffers"

export interface IUseCreateOffer extends ICreateGeneralOffers {
    id: number | undefined
    valueCategory:
        | {
              id: number
              slug: TProviderOffer
          }
        | undefined

    setId: Dispatch<number>
    setValueCategory: Dispatch<{
        id: number
        slug: TProviderOffer
    }>
    deleteFile: Dispatch<number>
    reset: DispatchWithoutAction
}
