import { type IServiceThreads } from "./types"

import { fetchGet, wrapperPost, wrapperDelete } from "../request"

const url = "/threads"

export const getThreads: IServiceThreads["get"] = (query) => fetchGet({ url, query })
export const getThreadId: IServiceThreads["getId"] = (id) => fetchGet({ url: `${url}/${id}`, query: { messagesLimit: 0 } })
// export const getThreadUserId: IServiceThreads["getUserId"] = (id) => fetchGet({ url: `${url}/user/${id}` })
export const postThread: IServiceThreads["post"] = (body) => wrapperPost({ url, body })
// export const patchThread: IServiceThreads["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const deleteThread: IServiceThreads["delete"] = (id) => wrapperDelete({ url, id })
