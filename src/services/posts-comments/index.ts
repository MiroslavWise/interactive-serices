import { type TTypeStatusComments } from "../comments/types"
import { IUserOffer } from "../offers/types"
import { fetchGet, type IResponse, post } from "../request"

export interface IBodyPostComment {
  parentId?: number
  postId: number
  noteId?: number
  message: string
  status: TTypeStatusComments
  enabled: boolean
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
