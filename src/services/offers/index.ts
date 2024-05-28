import type { IServiceOffers } from "./types"
import { wrapperPatch, wrapperDelete, get, post } from "../requestsWrapper"

const url = "/offers"

export const patchOffer: IServiceOffers["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const getOffers: IServiceOffers["get"] = (query) => get({ url, query })
export const getIdOffer: IServiceOffers["getId"] = (id) => get({ url: `${url}/${id}` })
export const getUserIdOffers: IServiceOffers["getUserId"] = (id, query) => get({ url: `${url}/user/${id}`, query })
export const deleteOffer: IServiceOffers["delete"] = (id) => wrapperDelete({ url, id })

export const postOffer: IServiceOffers["post"] = (body) => post({ url, body })
