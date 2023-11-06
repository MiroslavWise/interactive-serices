import { wrapperFetch } from "../requestsWrapper"
import type { IServiceOffersCategories, IResponseOffersCategories } from "./types"

export const serviceOffersCategories: IServiceOffersCategories = {
    route: "/offers-categories",
    get(value) {
        return wrapperFetch.methodGet<IResponseOffersCategories[]>(
            this.route,
            value,
        )
    },
    getId(id) {
        return wrapperFetch.methodGetId<IResponseOffersCategories>(
            this.route,
            id,
        )
    },
}
