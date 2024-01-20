import type { IServiceThreads } from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceThreads: IServiceThreads = {
    route: "/threads",
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
        return wrapperFetch.methodGetId(this.route, id, { messagesLimit: 0 })
    },
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
    getUserId(userId) {
        return wrapperFetch.methodGetId(`${this.route}/user`, userId)
    },
}
