import { TGetPostId, TGetPosts, TGetPostsFromUser, type TPostPosts } from "./types"
import { wrapperPatch, fetchGet, post } from "../request"

const url = "/posts"

export const postPosts: TPostPosts = (body) => post({ url, body })
export const getPosts: TGetPosts = (query) => fetchGet({ url, query })
export const getPostsFromUser: TGetPostsFromUser = ({ query, userId }) => fetchGet({ url: `${url}/user/${userId}`, query })
export const getPostId: TGetPostId = (id) => fetchGet({ url: `${url}/${id}` })
