import type { Dispatch } from "react"
import type { IPostAddress } from "@/services/addresses/types/serviceAddresses"
import type { TTypeProvider } from "@/services/file-upload/types"
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
