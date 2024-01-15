import type { IResponseOffersCategories } from "@/services/offers-categories/types"

export interface IValuesCategories {
    "search-categories": string
    categories: number[]
}

export interface IMainAndSubCategories {
    main: IResponseOffersCategories
    subs: IResponseOffersCategories[]
}
