import { TGetPostId, TGetPosts, TGetPostsFromUser, TPatchPost, type TPostPosts } from "./types"
import { fetchGet, post, patch } from "../request"

const url = "/posts"

export const postPosts: TPostPosts = (body) => post({ url, body })
export const patchPost: TPatchPost = (id, body) => patch({ url: `${url}/${id}`, body })
export const getPosts: TGetPosts = (query) => fetchGet({ url, query })
export const getPostsFromUser: TGetPostsFromUser = ({ query, userId }) => fetchGet({ url: `${url}/user/${userId}`, query })
export const getPostId: TGetPostId = (id) => fetchGet({ url: `${url}/${id}` })
