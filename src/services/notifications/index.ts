import type { IServiceNotifications } from "./types"

import { wrapperPost, wrapperPatch, fetchGet } from "../request"

const url = "/notifications"

export const serviceNotifications: IServiceNotifications = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => fetchGet({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
