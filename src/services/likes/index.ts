import { type TGetLikeTargetId, type TGetLikes, type TPostLike } from "./types"

import { post, fetchGet } from "../request"

const url = "/likes"

export const getLikes: TGetLikes = () => fetchGet({ url })
export const postLike: TPostLike = (body) => post({ url, body })
export const getLikeTargetId: TGetLikeTargetId = (provider, id) => fetchGet({ url: `${url}/${provider}/${id}` })
