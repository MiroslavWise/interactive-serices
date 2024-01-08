import type { IMessages, IRequestPatchMessages, IRequestPostMessages, IResponseCreate, IResponseMessage } from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceMessages: IMessages = {
    route: "/messages",
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    get(values) {
        return wrapperFetch.methodGet(this.route, values)
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
    getUserId(id) {
        return wrapperFetch.methodGetId(`${this.route}/user`, id)
    },
    postRead(id) {
        return wrapperFetch.methodPost(`${this.route}/${id}`)
    },
}
