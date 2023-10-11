import type {
    IBartersService,
    IBarterResponse,
    IPostDataBarter,
    IPatchDataBarter,
} from "./bartersService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceBarters: IBartersService = {
    route: "/barters",
    get(value) {
        return wrapperFetch.methodGet<IBarterResponse[]>(this.route, value)
    },
    getId(id) {
        return wrapperFetch.methodGetId<IBarterResponse>(this.route, id)
    },
    getUserId(id, queries) {
        return wrapperFetch.methodGetId<IBarterResponse[]>(
            `${this.route}/user`,
            id,
            queries,
        )
    },
    getReceiverId(id, queries) {
        return wrapperFetch.methodGetId<IBarterResponse[]>(
            `${this.route}/receiver`,
            id,
            queries,
        )
    },
    post(value) {
        return wrapperFetch.methodPost<IPostDataBarter, IBarterResponse>(
            this.route,
            value,
        )
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchDataBarter, IBarterResponse>(
            this.route,
            value,
            id,
        )
    },
    delete(id) {
        return wrapperFetch.methodDelete<IBarterResponse>(this.route, id)
    },
}
