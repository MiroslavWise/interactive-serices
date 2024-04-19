import type { IResponseOffers } from "@/services/offers/types"
import type { Dispatch } from "react"

interface IStateUpdateMutualOffer {
  data?: IResponseOffers
}

interface IAction {
  visible: boolean
  data?: IResponseOffers
}

interface IActionUpdateMutualOffer {
  dispatchUpdateMutual: Dispatch<IAction>
}

export type TUseUpdateMutualOffer = IStateUpdateMutualOffer & IActionUpdateMutualOffer
