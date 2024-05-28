import type { ILikesService } from "./types"

import { wrapperPost, get } from "../requestsWrapper"

const url = "/likes"

export const serviceLikes: ILikesService = {
  post: (body) => wrapperPost({ url, body }),
  get: () => get({ url }),
  getTargetId: (provider, id) => get({ url: `${url}/${provider}/${id}` }),
}
