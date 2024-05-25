import type { IServiceOffersCategories, TPostOfferCategory } from "./types"

import { wrapperGet, wrapperPost } from "../requestsWrapper"

const url = "/offers-categories"

export const serviceOffersCategories: IServiceOffersCategories = {
  get: (query) => wrapperGet({ url, query, cache: "force-cache" }),
}

export const postOfferCategory: TPostOfferCategory = ({ body }) => wrapperPost({ url, body })
