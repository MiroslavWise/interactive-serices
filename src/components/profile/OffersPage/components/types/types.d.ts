import type { Dispatch, FC, SetStateAction } from "react"
import type { TExchanges } from "@/store/types/useVisibleExchanges"
import type { IBarterResponse } from "@/services/barters/bartersService"

interface IContainerHeader {
    total: number
}

interface IContainerOffersNow {
    data: IBarterResponse[]
}

interface IMobileSegments {}

export interface IOffersCard {
    label: string
    src: string
    value: TExchanges
}

export type TMobileSegments = FC<IMobileSegments>
export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>
