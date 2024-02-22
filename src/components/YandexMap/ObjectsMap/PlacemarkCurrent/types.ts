import type { FC } from "react"
import type { IResponseOffers } from "@/services/offers/types"

export interface IPlacemarkCurrent {
  coordinates: [number, number][]
  id: string | number
  idUser: number | string
  offer: IResponseOffers
}

export type TPlacemarkCurrent = FC<IPlacemarkCurrent>

interface IStandardPropsPlace {
  time: string | Date
  title: string
  idPlace: string
  id: number | string
}

export interface IAlertBalloon extends IStandardPropsPlace {}

export interface IOfferBallon extends IStandardPropsPlace {}
export interface IDiscussionBallon extends IStandardPropsPlace {}
export interface IRequestBallon extends IStandardPropsPlace {}
