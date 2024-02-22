import type { IServiceOffers } from "./types"
import { wrapperPost, wrapperPatch, wrapperDelete, wrapperGet, wrapperGetId } from "../requestsWrapper"

const url = "/offers"

export const postOffer: IServiceOffers["post"] = (body) => wrapperPost({ url, body })
export const patchOffer: IServiceOffers["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const getOffers: IServiceOffers["get"] = (query) => wrapperGet({ url, query })
export const getIdOffer: IServiceOffers["getId"] = (id) => wrapperGetId({ url, id })
export const getUserIdOffers: IServiceOffers["getUserId"] = (id, query) => wrapperGetId({ url: `${url}/user`, query, id })
export const deleteOffer: IServiceOffers["delete"] = (id) => wrapperDelete({ url, id })

export const serviceOffers: Partial<IServiceOffers> = {}
