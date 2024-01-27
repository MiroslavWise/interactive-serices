import { type IAuth } from "./types/types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceAuth: IAuth = {
    route: "/auth",

    sms({ code, id }) {
        return wrapperFetch.methodPost(`${this.route}/sms`, { code, id })
    },
    phone({phone}) {
        return wrapperFetch.methodPost(`${this.route}/phone`, {phone:phone, agree: true})
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
    postVK(values) {
        return wrapperFetch.methodPost(`${this.route}/vk`, values)
    },
}
