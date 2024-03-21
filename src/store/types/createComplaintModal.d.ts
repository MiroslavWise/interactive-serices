import type { Dispatch } from "react"
import type { IUserResponse } from "@/services/users/types"
import { IResponseOffers } from "@/services/offers/types"

export interface IStateComplaintModal {
  visibleComplaint: boolean
  user?: IUserResponse
  offer?: IResponseOffers
}

export interface IAction {
  visible: boolean
  user?: IUserResponse
  offer?: IResponseOffers
}

export interface IActionComplaintModal {}

export type TUseComplaintModal = IStateComplaintModal & IActionComplaintModal
