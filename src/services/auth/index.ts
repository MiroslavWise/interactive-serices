import { type IAuth } from "./types/types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceAuth: IAuth = {
    route: "/auth",

    phone(value) {
        return wrapperFetch.methodPost(`${this.route}/phone`, value)
    },
    postGoogle(values) {
        return wrapperFetch.methodPost(`${this.route}/google`, values)
    },
    postTelegram(values) {
        return wrapperFetch.methodPost(`${this.route}/telegram`, values)
    },
    postYandex(values) {
        return wrapperFetch.methodPost(`${this.route}/yandex`, values)
    },
}
