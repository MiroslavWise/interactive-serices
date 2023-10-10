import type {
    IThreads as IServiceThreads,
    IResponseThreads,
    IResponseCreate,
    IPostThreads,
    IPatchThreads,
    IResponseThread,
} from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const serviceThreads: IServiceThreads = {
    route: "/threads",
    post(value) {
        return wrapperFetch.methodPost<IPostThreads, IResponseCreate>(
            this.route,
            value,
        )
    },
    get(value) {
        return wrapperFetch.methodGet<IResponseThreads[]>(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchThreads, IResponseCreate>(
            this.route,
            value,
            id,
        )
    },
    getId(id) {
        return wrapperFetch.methodGetId<IResponseThread>(this.route, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete<IResponseCreate>(this.route, id)
    },
    getUserId(userId) {
        return wrapperFetch.methodGetId<IResponseThreads[]>(
            `${this.route}/user`,
            userId,
        )
    },
}
