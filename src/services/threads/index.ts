import type { IServiceThreads } from "./types"

import { get, wrapperPost, wrapperDelete, wrapperPatch } from "../requestsWrapper"

const url = "/threads"

export const getThreads: IServiceThreads["get"] = (query) => get({ url, query })
export const getThreadId: IServiceThreads["getId"] = (id) => get({ url: `${url}/${id}`, query: { messagesLimit: 0 } })
export const getThreadUserId: IServiceThreads["getUserId"] = (id) => get({ url: `${url}/user/${id}` })
export const postThread: IServiceThreads["post"] = (body) => wrapperPost({ url, body })
export const patchThread: IServiceThreads["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const deleteThread: IServiceThreads["delete"] = (id) => wrapperDelete({ url, id })
