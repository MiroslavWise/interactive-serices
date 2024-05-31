import type { IServiceProfile } from "./types"

import { get, patch, post, wrapperDelete } from "@/services/request"

const url = "/profile"

export const serviceProfile: IServiceProfile = {
  get: () => get({ url }),
  getUserId: (id) => get({ url: `${url}/users/${id}` }),
  post: (body) => post({ url, body }),
  patch: (body) => patch({ url, body }),
  delete: (id) => wrapperDelete({ url, id }),
}

export const patchProfile: IServiceProfile["patch"] = (body) => patch({ url, body })
export const getProfile: IServiceProfile["get"] = () => get({ url })
export const getProfileUserId: IServiceProfile["getUserId"] = (id) => get({ url: `${url}/users/${id}` })
