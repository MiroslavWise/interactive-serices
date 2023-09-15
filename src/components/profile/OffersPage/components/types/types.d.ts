import type { Dispatch, FC, SetStateAction } from "react"
import type { TExchanges } from "@/store/types/useVisibleExchanges"

interface IContainerHeader{
  total: number
}

interface IContainerOffersNow{

}

interface IMobileSegments{
}

export interface IOffersCard {
  label: string
  src: string
  value: TExchanges
}


export type TMobileSegments = FC<IMobileSegments>
export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>