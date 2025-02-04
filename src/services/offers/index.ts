import { TGetStringOffers, TGetStringOffersUserId, type IServiceOffers } from "./types"
import { wrapperPatch, fetchGet, post } from "../request"
import { EAdvertsButton } from "@/types/enum"
import { URL_API } from "@/helpers"
import { createHeaders } from "../request/header"

const url = "/offers"

export const patchOffer: IServiceOffers["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const getOffers: IServiceOffers["get"] = (query) => fetchGet({ url, query })
export const getStringOffer: TGetStringOffers = (query) => {
  const endpoint = new URL(`${URL_API}${url}`)
  const headers = createHeaders()

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      endpoint.searchParams.append(key, typeof value === "string" ? value : String(value))
    })
  }

  return {
    url: endpoint.toString(),
    options: {
      method: "GET",
      headers,
    },
  }
}
export const getStringOfferUserId: TGetStringOffersUserId = (id, query) => {
  const endpoint = new URL(`${URL_API}${url}/user/${id}`)
  const headers = createHeaders()

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      endpoint.searchParams.append(key, typeof value === "string" ? value : String(value))
    })
  }

  return {
    url: endpoint.toString(),
    options: {
      method: "GET",
      headers,
    },
  }
}

export const getIdOffer: IServiceOffers["getId"] = (id) => fetchGet({ url: `${url}/${id}` })
export const getUserIdOffers: IServiceOffers["getUserId"] = (id, query, isInvalid) =>
  fetchGet({ url: `${url}/user/${id}`, query }, isInvalid)

export const postOffer: IServiceOffers["post"] = (body) => post({ url, body }, true)

export interface IBodyAdvert extends IBodyAdvertAction {
  title?: string
  ad?: string
  erid?: string
  inn?: string
  ogrn?: string
  imageId?: number
}

export interface IBodyAdvertAction {
  actions?: {
    action: EAdvertsButton
    url: string
    enabled: true
  }[]
}

/** Запрос для модератора */
export const patchAdvertOffer = (id: number, companyId: number) => wrapperPatch({ url, body: { companyId }, id })
