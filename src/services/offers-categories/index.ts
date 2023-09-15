import { wrapperFetch } from "../requestsWrapper"
import type { IOffersCategories, IResponseOffersCategories } from "./types"

export const serviceOffersCategories: IOffersCategories = {
    route: "/offers-categories",
    getAll(value) {
        return wrapperFetch.methodGet<IResponseOffersCategories[]>(
            this.route,
            value,
        )
    },
    get(id) {
        return wrapperFetch.methodGetId<IResponseOffersCategories>(
            this.route,
            id,
        )
    },
}
