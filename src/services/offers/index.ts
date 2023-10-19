import type { IServiceOffers } from "./types"
import { wrapperFetch } from "../requestsWrapper"

export const serviceOffers: IServiceOffers = {
    route: "/offers",
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch(this.route, value, id)
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
    },
    getUserId(id, value) {
        return wrapperFetch.methodGetId(`${this.route}/user`, id, value)
    },
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
}
