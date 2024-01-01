import type { IServiceUsers, IServiceUserValid } from "./types/usersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceUsers: IServiceUsers = {
    route: "/users",
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    getMe() {
        return wrapperFetch.methodGet("/user")
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
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

export const serviceUserValid: IServiceUserValid = {
    route: "/user",
    post(values) {
        return wrapperFetch.methodPost(this.route, values)
    },
    getEmailUser(value) {
        return wrapperFetch.methodGetId(`${this.route}/email`, value)
    },
}
