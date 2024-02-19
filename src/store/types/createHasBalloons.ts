import type { IResponseOffers } from "@/services/offers/types"

interface IStateHasBalloons {
    visibleHasBalloon: boolean
    offers?: IResponseOffers[]
}

export interface IAction {
    visibleHasBalloon: boolean
    offers?: IResponseOffers[]
}

export type TUseHasBalloons = IStateHasBalloons
