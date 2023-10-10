import type {
    IServiceAddresses,
    IAddressesResponse,
    IPostAddress,
    IPatchAddress,
} from "./types/serviceAddresses"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceAddresses: IServiceAddresses = {
    route: "/addresses",
    get(value) {
        return wrapperFetch.methodGet<IAddressesResponse[]>(this.route, value)
    },
    getId(id) {
        return wrapperFetch.methodGetId<IAddressesResponse>(this.route, id)
    },
    getHash(hash) {
        return wrapperFetch.methodGetId<IAddressesResponse>(
            `${this.route}/hash`,
            hash,
        )
    },
    post(value) {
        return wrapperFetch.methodPost<IPostAddress, { id: number }>(
            this.route,
            value,
        )
    },
    patch(value, id) {
        return wrapperFetch.methodPatch<IPatchAddress, IAddressesResponse>(
            this.route,
            value,
            id,
        )
    },
    delete(id) {
        return wrapperFetch.methodDelete<IAddressesResponse>(this.route, id)
    },
}
