import { wrapperFetch } from "../requestsWrapper"
import { type IAuth } from "./types/types"

export const serviceAuth: IAuth = {
    route: "/auth",

    phone(value) {
        return wrapperFetch.methodPost(`${this.route}/phone`, value)
    },
}
