import type { IResponseOffers } from "@/services/offers/types"
import type { ISmallDataOfferBarter } from "@/services/barters/types"
import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"

export interface IStateBallonOffer {
    visible: boolean
    offer?: ISmallDataOfferBarter | IResponseOffers
}

export interface IDispatchBallonOffer {
    visible: boolean
    offer?: ISmallDataOfferBarter | IResponseOffers
}
