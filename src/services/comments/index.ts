import { wrapperFetch } from "../requestsWrapper"
import {
    ICommentsResponse,
    ICommentsService,
    IPatchDataComment,
    IPostDataComment,
} from "./types"

export const serviceComments: ICommentsService = {
    route: "/comments",
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
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
