import type { IServiceProfile } from "./types"

import { get, wrapperPost, wrapperPatch, wrapperDelete } from "@/services/requestsWrapper"

const url = "/profile"

export const serviceProfile: IServiceProfile = {
  get: () => get({ url }),
  getUserId: (id) => get({ url: `${url}/users/${id}` }),
  post: (body) => wrapperPost({ url, body }),
  patch: (body) => wrapperPatch({ url, body }),
  delete: (id) => wrapperDelete({ url, id }),
}

export const patchProfile: IServiceProfile["patch"] = (body) => wrapperPatch({ url, body })
export const getProfile: IServiceProfile["get"] = () => get({ url })
export const getProfileUserId: IServiceProfile["getUserId"] = (id) => get({ url: `${url}/users/${id}` })
