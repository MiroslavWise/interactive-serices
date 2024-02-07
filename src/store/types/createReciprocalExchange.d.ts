import { ISmallDataOfferBarter } from "@/services/barters/types"
import { IResponseOffers } from "@/services/offers/types"
import type { IGetProfileIdResponse } from "@/services/profile/types"

type TStateOffers = "current" | "array"

export interface IStateReciprocalExchange {
    visible: boolean
    isCollapse: boolean
    profile?: IGetProfileIdResponse
    type?: TStateOffers
    offer?: ISmallDataOfferBarter | IResponseOffers
}

export interface IActionReciprocalExchange {
    visible: boolean
    profile?: IGetProfileIdResponse
    type?: TStateOffers
    offer?: ISmallDataOfferBarter | IResponseOffers
}
