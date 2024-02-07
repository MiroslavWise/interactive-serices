import type { IServiceOffersThreads } from "./types"

import { wrapperDelete, wrapperGet, wrapperPost, wrapperPatch, wrapperGetId } from "../requestsWrapper"

const url = "/offers-threads"

export const serviceOffersThreads: IServiceOffersThreads = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => wrapperGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  getId: (id) => wrapperGetId({ url, id }),
  delete: (id) => wrapperDelete({ url, id }),
}
