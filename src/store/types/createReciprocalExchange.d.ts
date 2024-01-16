import { IResponseOffers } from "@/services/offers/types"
import type { IGetProfileIdResponse } from "@/services/profile/types/profileService"

type TStateOffers = "current" | "array"

export interface IStateReciprocalExchange {
    visible: boolean
    isCollapse: boolean
    profile?: IGetProfileIdResponse
    type?: TStateOffers
    offer?: IResponseOffers
}

export interface IActionReciprocalExchange {
    visible: boolean
    profile?: IGetProfileIdResponse
    type?: TStateOffers
    offer?: IResponseOffers
}
