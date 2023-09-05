import type {
    IThreads,
    IResponseThreads,
    IResponseCreate,
    IPostThreads,
    IPatchThreads,
    IResponseThread,
} from "./types"

import { wrapperFetch } from "../requestsWrapper"

export const threadsService: IThreads = {
    route: "/threads",
    post(value) {
        return wrapperFetch.methodPost<IPostThreads, IResponseCreate>(
            this.route,
            value,
        )
    },
    getAll(value) {
        return wrapperFetch.methodGet<IResponseThreads[]>(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchThreads, IResponseCreate>(
            this.route,
            value,
            id,
        )
    },
    get(id) {
        return wrapperFetch.methodGetId<IResponseThread>(this.route, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete<IResponseCreate>(this.route, id)
    },
    getUserQuery(userId) {
        return wrapperFetch.methodGetId<IResponseThreads[]>(
            `${this.route}/user`,
            userId,
        )
    },
}
