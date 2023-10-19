import { wrapperFetch } from "../requestsWrapper"
import type { IServiceTestimonials } from "./types"

export const serviceTestimonials: IServiceTestimonials = {
    route: "/testimonials",
    post(value) {
        return wrapperFetch.methodPost(this.route, value)
    },
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    patch(value, id) {
        return wrapperFetch.methodPatch(this.route, value, id)
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
    },
    delete(id) {
        return wrapperFetch.methodDelete(this.route, id)
    },
}
