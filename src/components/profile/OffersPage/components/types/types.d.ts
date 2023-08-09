import type { Dispatch, FC, SetStateAction } from "react"

interface IContainerHeader{
  total: number
}

interface IContainerOffersNow{

}

interface IMobileSegments{
  value: TExchanges
  setValue: Dispatch<SetStateAction<TExchanges>>
}

export type TExchanges = "current" | "completed"
export interface IOffersCard {
  label: string
  src: string
  value: TExchanges
}


export type TMobileSegments = FC<IMobileSegments>
export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>