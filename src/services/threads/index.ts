import type { IServiceThreads } from "./types"

import { wrapperGet, wrapperPost, wrapperGetId, wrapperDelete, wrapperPatch } from "../requestsWrapper"

const url = "/threads"

export const serviceThreads: IServiceThreads = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => wrapperGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  getId: (id) => wrapperGetId({ url, id, query: { messagesLimit: 0 } }),
  delete: (id) => wrapperDelete({ url, id }),
  getUserId: (id) => wrapperGetId({ url: `${url}/user`, id }),
}
