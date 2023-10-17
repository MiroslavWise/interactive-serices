import type { IBartersService } from "./types"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceBarters: IBartersService = {
    route: "/barters",
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
    },
    getUserId(id, queries) {
        return wrapperFetch.methodGetId(`${this.route}/user`, id, queries)
    },
    getReceiverId(id, queries) {
        return wrapperFetch.methodGetId(`${this.route}/receiver`, id, queries)
    },
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch(this.route, value, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
}
