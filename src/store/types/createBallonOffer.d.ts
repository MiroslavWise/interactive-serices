import type { IResponseOffers } from "@/services/offers/types"
import { IGetProfileIdResponse } from "@/services/profile/types/profileService"

export interface IStateBallonOffer {
    visible: boolean
    offer?: IResponseOffers
}

export interface IDispatchBallonOffer {
    visible: boolean
    offer?: IResponseOffers
}
