import type { IFriendsService } from "./types"

import { wrapperDelete, wrapperGet, wrapperGetId, wrapperPost } from "../requestsWrapper"

const url = "/friends"

export const serviceFriends: IFriendsService = {
  get(value) {
    let query: typeof value = {}
    if (value) query = { ...value }
    query.order = "DESC"
    return wrapperGet({ url, query })
  },
  getId: (id) => wrapperGetId({ url, id }),
  post: (body) => wrapperPost({ url, body }),
  delete: (id) => wrapperDelete({ url, id }),
}
