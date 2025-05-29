import type { Dispatch } from "react"

export interface IUseFetchingSession {
    offersCategories: boolean

    getFetchingOffersCategories: Dispatch<boolean>
}
