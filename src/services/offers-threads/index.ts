import type { IServiceOffersThreads } from "./types"
import { wrapperFetch } from "../requestsWrapper"

export const serviceOffersThreads: IServiceOffersThreads = {
    route: "/offers-threads",
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
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
}
