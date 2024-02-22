import type { ICommentsService } from "./types"
import { wrapperGet, wrapperGetId, wrapperPost, wrapperPatch } from "../requestsWrapper"

const url = "/comments"

export const serviceComments: ICommentsService = {
  get: (query) => wrapperGet({ url, query }),
  getId: (id) => wrapperGetId({ url, id }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
