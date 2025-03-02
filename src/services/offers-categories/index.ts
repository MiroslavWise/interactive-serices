import { IResponseOffersCategories, type IServiceOffersCategories, type TPostOfferCategory } from "./types"

import { fetchGet, wrapperPost } from "../request"

const url = "/offers-categories"

export const getOffersCategories: IServiceOffersCategories["get"] = (value) =>
  fetchGet({ url, query: value?.query ? value?.query : { provider: "main" } })
//TODO
export const getOffersCategoriesPROD = async () => {
  try {
    const response = await fetch("https://sheira.ru/api/v1/offers-categories", { method: "GET" })
    const { data, error, meta } = await response.json()
    return {
      data: data as IResponseOffersCategories[],
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
