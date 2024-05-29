import type { IServiceNotifications } from "./types"

import { wrapperPost, get, wrapperPatch } from "../request"

const url = "/notifications"

export const serviceNotifications: IServiceNotifications = {
  post: (body) => wrapperPost({ url, body }),
  get: (query) => get({ url, query }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
}
