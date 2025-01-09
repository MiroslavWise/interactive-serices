import { type IServiceOffers } from "./types"
import { wrapperPatch, fetchGet, post } from "../request"
import { TSchemaAdvert } from "@/components/templates/AddAdverts/schema"

const url = "/offers"

export const patchOffer: IServiceOffers["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const getOffers: IServiceOffers["get"] = (query) => fetchGet({ url, query })
export const getIdOffer: IServiceOffers["getId"] = (id) => fetchGet({ url: `${url}/${id}` })
export const getUserIdOffers: IServiceOffers["getUserId"] = (id, query, isInvalid) =>
  fetchGet({ url: `${url}/user/${id}`, query }, isInvalid)

export const postOffer: IServiceOffers["post"] = (body) => post({ url, body }, true)

/** Запрос для модератора */
export const patchAdvertOffer = (id: number, body: TSchemaAdvert) => wrapperPatch({ url, body: { company: body }, id })
