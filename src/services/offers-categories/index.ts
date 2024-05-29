import type { IServiceOffersCategories, TPostOfferCategory } from "./types"

import { get, wrapperPost } from "../request"

const url = "/offers-categories"

export const getOffersCategories: IServiceOffersCategories["get"] = (value) => get({ url, query: value?.query })
export const postOfferCategory: TPostOfferCategory = ({ body }) => wrapperPost({ url, body })
