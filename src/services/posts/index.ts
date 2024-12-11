import { TGetPostId, TGetPostParticipants, TGetPosts, TGetPostsFromUser, TPatchPost, type TPostPosts } from "./types"
import { fetchGet, post, patch, wrapperDelete } from "../request"

const url = "/posts"

export const postPosts: TPostPosts = (body) => post({ url, body }, true)
export const patchPost: TPatchPost = (id, body) => patch({ url: `${url}/${id}`, body })
export const getPosts: TGetPosts = (query, isInvalid) => fetchGet({ url, query }, isInvalid)
export const getPostsFromUser: TGetPostsFromUser = ({ query, userId }) => fetchGet({ url: `${url}/user/${userId}`, query })
export const getPostId: TGetPostId = (id) => fetchGet({ url: `${url}/${id}` })

export const getPostParticipants: TGetPostParticipants = (id) => fetchGet({ url: `${url}/participants/${id}` })

export const deletePostId = (id: number) => wrapperDelete({ url: `${url}/${id}`, id })
