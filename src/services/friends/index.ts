import { type IFriendsService, type TGetFriendId, type TGetFriends } from "./types"

import { wrapperDelete, wrapperPost, fetchGet } from "../request"

const url = "/friends"

export const postFriend: IFriendsService["post"] = (body) => wrapperPost({ url, body })
export const getFriends: TGetFriends = ({ query }) => fetchGet({ url, query })
export const getFiendId: TGetFriendId = (id) => fetchGet({ url: `${url}/${id}`, query: { order: "DESC" } })
export const deleteFriend: IFriendsService["delete"] = (id) => wrapperDelete({ url, id })
