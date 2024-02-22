import type { IMessages } from "./types"

import { wrapperPost, wrapperGet, wrapperPatch } from "../requestsWrapper"

const url = "/messages"

export const getMessages: IMessages["get"] = (query) => wrapperGet({ url, query })
export const postMessage: IMessages["post"] = (body) => wrapperPost({ url, body })
export const patchMessage: IMessages["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const postReadMessage: IMessages["postRead"] = (id) => wrapperPost({ url: `${url}/${id}` })
