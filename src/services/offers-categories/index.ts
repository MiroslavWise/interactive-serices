import type { IServiceOffersCategories, TPostOfferCategory } from "./types"

import { get, wrapperPost } from "../request"

const url = "/offers-categories"

export const getOffersCategories: IServiceOffersCategories["get"] = (value) => get({ url, query: value?.query })
//TODO
export const getOffersCategoriesPROD = async () => {
  try {
    const response = await fetch("https://sheira.ru/api/v1/offers-categories", { method: "GET" })
    const { data, error, meta } = (await response.json()) as any
    return {
      data,
      meta,
      error,
    }
  } catch (e) {
    return {
      data: null,
      error: e,
      meta: null,
    }
  }
}

export const postOfferCategory: TPostOfferCategory = ({ body }) => wrapperPost({ url, body })
