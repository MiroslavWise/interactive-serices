import { IResponseOffers, IUserOffer } from "@/services/offers/types"

export interface IStateComplaintModal {
  user?: IUserOffer
  offer?: IResponseOffers
}

export interface IAction {
  user?: IUserOffer
  offer?: IResponseOffers
}

export interface IActionComplaintModal {}

export type TUseComplaintModal = IStateComplaintModal & IActionComplaintModal
