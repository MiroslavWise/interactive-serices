import { wrapperFetch } from "../requestsWrapper"
import type {
    IServiceOffers,
    IPatchOffers,
    IPostOffers,
    IResponseCreate,
    IResponseOffers,
} from "./types"

export const serviceOffer: IServiceOffers = {
    route: "/offers",
    post(value) {
        return wrapperFetch.methodPost<IPostOffers, IResponseCreate>(
            this.route,
            value,
        )
    },
    get(value) {
        return wrapperFetch.methodGet<IResponseOffers[]>(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchOffers, IResponseCreate>(
            this.route,
            value,
            id,
        )
    },
    getId(id) {
        return wrapperFetch.methodGetId<IResponseOffers>(this.route, id)
    },
    getUserId(id, value) {
        return wrapperFetch.methodGetId<IResponseOffers[]>(
            `${this.route}/user`,
            id,
            value,
        )
    },
    delete(id) {
        return wrapperFetch.methodDelete<IResponseCreate>(this.route, id)
    },
}
