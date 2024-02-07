import type { IServiceNotifications } from "./types"

import { wrapperPost, wrapperGet, wrapperPatch } from "../requestsWrapper"

const url = "/notifications"

export const serviceNotifications: IServiceNotifications = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => wrapperGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
