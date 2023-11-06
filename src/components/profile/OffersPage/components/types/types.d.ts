import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"
import type { TExchanges } from "@/store/types/useVisibleExchanges"
import type { IBarterResponse } from "@/services/barters/types"
import type { IActionOffers } from "../../types/types"
import type { TTypeStatusBarter } from "@/services/file-upload/types"

interface IContainerHeader {
    total: number
    isToMe: boolean
    dispatch: Dispatch<IActionOffers>
}

interface IContainerOffersNow {
    isToMe: boolean
    dispatch: Dispatch<IActionOffers>
}

interface IMobileSegments {}

export interface IOffersCard {
    label: string
    src: string
    value: TTypeStatusBarter
}

export type TMobileSegments = FC<IMobileSegments>
export type TContainerHeader = FC<IContainerHeader>
export type TContainerOffersNow = FC<IContainerOffersNow>
