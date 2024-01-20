import type { IServiceAddresses } from "./types/serviceAddresses"

import { wrapperFetch } from "@/services"

export const serviceAddresses: IServiceAddresses = {
    route: "/addresses",
    get(value) {
        return wrapperFetch.methodGet(this.route, value)
    },
    getId(id) {
        return wrapperFetch.methodGetId(this.route, id)
    },
    getHash(hash) {
        return wrapperFetch.methodGetId(`${this.route}/hash`, hash)
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
