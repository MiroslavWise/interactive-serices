import { IResponseOffers } from "@/services/offers/types"
import type { Dispatch } from "react"

interface IDataProfile {
  photo: string
  fullName: string
  idUser: number
}

export interface IOfferData {
  id: number
  categoryId: number
}
export interface IUseVisibleModalBarter {
  isVisible: boolean
  dataProfile: IDataProfile | undefined
  dataOffer?: IResponseOffers

  dispatchVisibleBarter: Dispatch<{
    isVisible: boolean
    dataProfile?: IDataProfile
    dataOffer?: IResponseOffers
  }>
}
