import { type TPostPosts } from "./types"
import { wrapperPatch, fetchGet, post } from "../request"

const url = "/posts"

export const postPosts: TPostPosts = (body) => post({ url, body })
