import type { IMessages } from "./types"

import { wrapperPost, wrapperPatch, get } from "../requestsWrapper"

const url = "/messages"

export const getMessages: IMessages["get"] = (query) => get({ url: url, query: query })
export const postMessage: IMessages["post"] = (body) => wrapperPost({ url, body })
export const patchMessage: IMessages["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const postReadMessage: IMessages["postRead"] = (id) => wrapperPost({ url: `${url}/${id}` })
