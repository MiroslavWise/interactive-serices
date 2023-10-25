import type { IFriendsService } from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceFriends: IFriendsService = {
    route: "/friends",
    get(value) {
        let values: typeof value = {}
        if (value) values = { ...value }
        values.order = "DESC"
        return wrapperFetch.methodGet(this.route, value)
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
    },
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
}
