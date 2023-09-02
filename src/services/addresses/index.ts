import type {
    IResponseAddresses,
    IAddressesResponse,
    IPostAddress,
    IPatchAddress,
} from "./types/serviceAddresses"

import { wrapperFetch } from "@/services/requestsWrapper"

export const serviceAddresses: IResponseAddresses = {
    route: "/addresses",
    getAddresses(value) {
        return wrapperFetch.methodGet<IAddressesResponse[]>(this.route, value)
    },
    getAddressId(id) {
        return wrapperFetch.methodGetId<IAddressesResponse>(this.route, id)
    },
    postAddress(value) {
        return wrapperFetch.methodPost<IPostAddress, IAddressesResponse>(
            this.route,
            value,
        )
    },
    patchAddress(value, id) {
        return wrapperFetch.methodPatch<IPatchAddress, IAddressesResponse>(
            this.route,
            value,
            id,
        )
    },
    deleteAddress(id) {
        return wrapperFetch.methodDelete<IAddressesResponse>(this.route, id)
    },
}
