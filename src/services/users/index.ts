import type { IServiceUser } from "./types/usersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceUser: IServiceUser = {
    route: "/user",
    get() {
        return wrapperFetch.methodGet(this.route)
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
    },
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    getEmail(value) {
        return wrapperFetch.methodGetId(`${this.route}/email`, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch(this.route, value, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
}
