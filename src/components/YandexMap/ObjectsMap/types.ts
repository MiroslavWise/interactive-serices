import type { FC } from "react"
import type { IResponseOffers } from "@/services/offers/types"

export interface IPlacemarkCurrent {
  coordinates: [number, number][]
  offer: IResponseOffers
}
