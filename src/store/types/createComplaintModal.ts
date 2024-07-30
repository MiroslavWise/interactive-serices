import { IResponseOffers, IUserOffer } from "@/services/offers/types"

interface IStateComplaintModal {
  user?: IUserOffer
  offer?: IResponseOffers
}

export interface IAction {
  user?: IUserOffer
  offer?: IResponseOffers
}

export type TUseComplaintModal = IStateComplaintModal
