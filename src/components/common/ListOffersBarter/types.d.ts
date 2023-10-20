import { IResponseOffers } from "@/services/offers/types"
import type { DetailedHTMLProps, Dispatch, FC, HTMLAttributes } from "react"

export interface IListOffersBarter {
    items?: IResponseOffers[]
    active: number
    onClick: Dispatch<number>
}

export type TListOffersBarter = DetailedHTMLProps<
    HTMLAttributes<HTMLElement>,
    HTMLElement
> &
    IListOffersBarter
