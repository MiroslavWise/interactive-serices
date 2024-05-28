import type { IServiceOffersThreads } from "./types"

import { wrapperDelete, get, wrapperPost, wrapperPatch } from "../requestsWrapper"

const url = "/offers-threads"

export const serviceOffersThreads: IServiceOffersThreads = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => get({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  getId: (id) => get({ url: `${url}/${id}` }),
  delete: (id) => wrapperDelete({ url, id }),
}
