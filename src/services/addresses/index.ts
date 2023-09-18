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
    post(value) {
        return wrapperFetch.methodPost<IPostAddress, IAddressesResponse>(
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
