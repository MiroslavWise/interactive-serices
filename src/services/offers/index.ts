import { wrapperFetch } from "../requestsWrapper"
import type {
    IOffers,
    IPatchOffers,
    IPostOffers,
    IResponseCreate,
    IResponseOffers,
} from "./types"

export const serviceOffer: IOffers = {
    route: "/offers",
    post(value) {
        return wrapperFetch.methodPost<IPostOffers, IResponseCreate>(
            this.route,
            value,
        )
    },
    getAll(value) {
        return wrapperFetch.methodGet<IResponseOffers[]>(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchOffers, IResponseCreate>(
            this.route,
            value,
            id,
        )
    },
    get(id) {
        return wrapperFetch.methodGetId<IResponseOffers>(this.route, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete<IResponseCreate>(this.route, id)
    },
}
