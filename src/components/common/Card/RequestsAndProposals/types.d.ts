import { IResponseOffers } from "@/services/offers/types"
import type { FC } from "react"

export interface IRequestsAndProposals extends IResponseOffers {
    type?: "optional-2" | "optional-3"
    ref?: any
}

export type TRequestsAndProposals = FC<IRequestsAndProposals>
