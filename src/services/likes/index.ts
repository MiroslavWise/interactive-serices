import type { ILikesService } from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceLikes: ILikesService = {
    route: "/likes",
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    get() {
        return wrapperFetch.methodGet(this.route)
    },
    getTargetId(provider, id) {
        return wrapperFetch.methodGet(`${this.route}/${provider}/${id}`)
    },
}
