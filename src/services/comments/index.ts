import { type ICommentsService } from "./types"
import { wrapperPost, fetchGet } from "../request"

const url = "/comments"

export const getComments: ICommentsService["get"] = (query) => fetchGet({ url, query })
export const postComment: ICommentsService["post"] = (body) => wrapperPost({ url, body })
