import type {
    IMessages,
    IRequestPatchMessages,
    IRequestPostMessages,
    IResponseCreate,
    IResponseMessage,
} from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceMessages: IMessages = {
    route: "/messages",
    post(value) {
        return wrapperFetch.methodPost<IRequestPostMessages, IResponseCreate>(
            this.route,
            value,
        )
    },
    getAll(values) {
        return wrapperFetch.methodGet<IResponseMessage[]>(this.route, values)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IRequestPatchMessages, IResponseCreate>(
            this.route,
            value,
            id,
        )
    },
    getId(id) {
        return wrapperFetch.methodGetId<IResponseMessage>(this.route, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete<IResponseCreate>(this.route, id)
    },
    getUserQuery(id) {
        return wrapperFetch.methodGetId<IResponseMessage[]>(
            `${this.route}/user`,
            id,
        )
    },
}
