import type { ILikesService } from "./types"

import { wrapperPost, wrapperGet, wrapperGetId } from "../requestsWrapper"

const url = "/likes"

export const serviceLikes: ILikesService = {
  post: (body) => wrapperPost({ url, body }),
  get: () => wrapperGet({ url }),
  getTargetId: (provider, id) => wrapperGetId({ url: `${url}/${provider}`, id }),
}
