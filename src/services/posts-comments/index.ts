import { type INotes } from "../notes/types"
import { type IImageData } from "@/types/type"
import { type IUserOffer } from "../offers/types"
import { type IResponse } from "../request/types"
import { type TTypeStatusComments } from "../comments/types"

import { fetchGet, post } from "../request"

export interface IBodyPostComment {
  parentId?: number
  postId: number
  noteId?: number
  message: string
  status: TTypeStatusComments
  enabled: boolean
  images?: number[]
}

export interface IPostsComment {
  id: number
  userId: number
  postId: number
  noteId?: number
  message: string
  status: TTypeStatusComments
  created: string
  user: IUserOffer
  note?: INotes
  images: IImageData[]
}

interface IQueries {
  page?: number
  limit?: number
  post: number
}

type TPostPostsComment = (body: IBodyPostComment) => Promise<IResponse<{ id: number }>>
type TGetPostsComments = (query: IQueries) => Promise<IResponse<IPostsComment[]>>

const url = "/posts-comments"

export const postPostsComment: TPostPostsComment = (body) => post({ url, body })
export const getPostsComments: TGetPostsComments = (query) => fetchGet({ url, query })
