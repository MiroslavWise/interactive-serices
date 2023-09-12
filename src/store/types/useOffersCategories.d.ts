import type { IResponseOffersCategories } from "@/services/offers-categories/types"
import { DispatchWithoutAction } from "react"

export interface IUseOffersCategories {
    categories: IResponseOffersCategories[]
    hash: number | string | undefined

    getCategories: () => Promise<boolean>
}
