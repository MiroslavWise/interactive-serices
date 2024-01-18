import type { IServiceProfile } from "./types/profileService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceProfile: IServiceProfile = {
    route: "/profile",
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    getUserId(userId) {
        return wrapperFetch.methodGetId(`${this.route}/user`, userId)
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
