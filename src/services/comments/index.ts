import type { ICommentsService } from "./types"
import { get, wrapperPost, wrapperPatch, fetchGet } from "../request"

const url = "/comments"

export const serviceComments: ICommentsService = {
  get: (query) => fetchGet({ url, query }),
  getId: (id) => get({ url: `${url}/${id}` }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
