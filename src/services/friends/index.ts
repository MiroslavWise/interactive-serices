import type { IFriendsService, TGetFriendId, TGetFriends } from "./types"

import { wrapperDelete, get, wrapperPost } from "../request"

const url = "/friends"

export const serviceFriends: IFriendsService = {
  get(value) {
    let query: typeof value = {}
    if (value) query = { ...value }
    query.order = "DESC"
    return get({ url, query })
  },
  getId: (id) => get({ url: `${url}/${id}` }),
  post: (body) => wrapperPost({ url, body }),
  delete: (id) => wrapperDelete({ url, id }),
}

export const getFriends: TGetFriends = ({ query }) => get({ url, query })
export const getFiendId: TGetFriendId = (id) => get({ url: `${url}/${id}` })
