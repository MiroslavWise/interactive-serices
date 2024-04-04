import type { IResponseOffers } from "@/services/offers/types"
import type { ISmallDataOfferBarter } from "@/services/barters/types"
import type { IGetProfileIdResponse } from "@/services/profile/types"

export interface IStateBallonOffer {
  offer?: ISmallDataOfferBarter | IResponseOffers
}

export interface IDispatchBallonOffer {
  offer?: ISmallDataOfferBarter | IResponseOffers
}
