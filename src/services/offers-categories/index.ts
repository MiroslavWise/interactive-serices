import type { IServiceOffersCategories } from "./types"

import { wrapperGet } from "../requestsWrapper"

const url = "/offers-categories"

export const serviceOffersCategories: IServiceOffersCategories = {
  get: (query) => wrapperGet({ url, query, cache: "force-cache" }),
}
