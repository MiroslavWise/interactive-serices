import type { IBartersService } from "./types"

import { wrapperGet, wrapperGetId, wrapperPatch, wrapperPost } from "@/services/requestsWrapper"

const url = "/barters"

export const getBarters: IBartersService["get"] = (query) => wrapperGet({ url, query })

export const serviceBarters: IBartersService = {
  get: (query) => wrapperGet({ url, query }),
  getId: (id) => wrapperGetId({ url, id }),
  getUserId: (id, query) => wrapperGetId({ url: `${url}/initiator`, id, query }),
  getReceiverId: (id, query) => wrapperGetId({ url: `${url}/receiver`, id, query }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
