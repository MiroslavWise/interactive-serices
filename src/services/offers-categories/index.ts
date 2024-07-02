import type { IServiceOffersCategories, TPostOfferCategory } from "./types"

import { get, wrapperPost } from "../request"

const url = "/offers-categories"

export const getOffersCategories: IServiceOffersCategories["get"] = (value) => get({ url, query: value?.query })
//TODO
export const getOffersCategoriesPROD: IServiceOffersCategories["get"] = async () => {
  try {
    const response = await fetch("https://sheira.ru/api/v1/offers-categories", { method: "GET" })

    const { data, error, meta } = (await response.json()) as any

    return {
      ok: !error && !!data,
      res: data,
      meta: meta,
    }
  } catch (e) {
    return {
      ok: false,
      error: e,
    }
  }
}

export const postOfferCategory: TPostOfferCategory = ({ body }) => wrapperPost({ url, body })
