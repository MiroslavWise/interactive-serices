import type { IServiceOffers } from "./types"
import { wrapperPost, wrapperPatch, wrapperDelete, wrapperGet, wrapperGetId } from "../requestsWrapper"

const url = "/offers"

export const serviceOffers: IServiceOffers = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => wrapperGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  getId: (id) => wrapperGetId({ url, id }),
  getUserId: (id, query) => wrapperGetId({ url: `${url}/user`, query, id }),
  delete: (id) => wrapperDelete({ url, id }),
}
