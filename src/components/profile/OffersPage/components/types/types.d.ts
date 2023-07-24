import type { FC } from "react"

interface IContainerHeader{
  total: number
}

interface IContainerOffersNow{

}

export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>