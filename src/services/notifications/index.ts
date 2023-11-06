import type { IServiceNotifications } from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceNotifications: IServiceNotifications = {
    route: "/notifications",
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch(this.route, value, id)
    },
}
