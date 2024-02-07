import type { IMessages } from "./types"

import { wrapperPost, wrapperGet, wrapperPatch, wrapperGetId } from "../requestsWrapper"

const url = "/messages"

export const serviceMessages: IMessages = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => wrapperGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  getId: (id) => wrapperGetId({ url, id }),
  getUserId: (id) => wrapperGetId({ url: `${url}/user`, id }),
  postRead: (id) => wrapperPost({ url: `${url}/${id}` }),
}
