import type { IServiceProfile } from "./types"

import { wrapperGet, wrapperGetId, wrapperPost, wrapperPatch, wrapperDelete } from "@/services/requestsWrapper"

const url = "/profile"

export const serviceProfile: IServiceProfile = {
  get: () => wrapperGet({ url }),
  getUserId: (id) => wrapperGetId({ url: `${url}/users`, id }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body) => wrapperPatch({ url, body }),
  delete: (id) => wrapperDelete({ url, id }),
}

export const patchProfile: IServiceProfile["patch"] = (body) => wrapperPatch({ url, body })
export const getProfile: IServiceProfile["get"] = () => wrapperGet({ url })
export const getProfileUserId: IServiceProfile["getUserId"] = (id) => wrapperGetId({ url: `${url}/users`, id })
