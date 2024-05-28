import type { ICommentsService } from "./types"
import { get, wrapperPost, wrapperPatch } from "../requestsWrapper"

const url = "/comments"

export const serviceComments: ICommentsService = {
  get: (query) => get({ url, query }),
  getId: (id) => get({ url: `${url}/${id}` }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
