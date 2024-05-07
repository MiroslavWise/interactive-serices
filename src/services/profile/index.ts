import type { IServiceProfile } from "./types"

import { wrapperGet, wrapperGetId, wrapperPost, wrapperPatch, wrapperDelete } from "@/services/requestsWrapper"

const url = "/profile"

export const serviceProfile: IServiceProfile = {
  get: (query) => wrapperGet({ url, query }),
  getUserId: (id) => wrapperGetId({ url: url, id }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body, id) => wrapperPatch({ url, body, id }),
  delete: (id) => wrapperDelete({ url, id }),
}

export const patchProfile: IServiceProfile["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const getProfileUserId: IServiceProfile["getUserId"] = (id) => wrapperGetId({ url: `${url}/user`, id })
