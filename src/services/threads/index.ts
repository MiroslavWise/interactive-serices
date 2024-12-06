import { type IServiceThreads } from "./types"

import { fetchGet, wrapperPost, wrapperDelete } from "../request"

const url = "/threads"

export const getThreads: IServiceThreads["get"] = (query) => fetchGet({ url, query }, true)
export const getThreadId: IServiceThreads["getId"] = (id) => fetchGet({ url: `${url}/${id}`, query: { messagesLimit: 0 } })
export const postThread: IServiceThreads["post"] = (body) => wrapperPost({ url, body })
export const deleteThread: IServiceThreads["delete"] = (id) => wrapperDelete({ url, id })
