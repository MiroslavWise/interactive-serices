import type { IServiceUser, TPatchEmailPasswordUser } from "./types"

import { get, wrapperPost, wrapperPatch, wrapperDelete } from "@/services/requestsWrapper"

const url = "/user"

export const getUser: IServiceUser["get"] = () => get({ url })
export const getUserId: IServiceUser["getId"] = (id) => get({ url: `${url}/${id}` })
export const postUser: IServiceUser["post"] = (body, urlSearchParams) =>
  wrapperPost({ url: `${url}${urlSearchParams ? `/?${urlSearchParams}` : ""}`, body })
export const patchUser: IServiceUser["patch"] = (body, id) => wrapperPatch({ url, body, id })
export const deleteUser: IServiceUser["delete"] = (id) => wrapperDelete({ url, id })
export const getUserEmail: IServiceUser["getEmail"] = (id) => get({ url: `${url}/email/${id}` })

export const patchEmailPasswordUser: TPatchEmailPasswordUser = (body, id) => wrapperPatch({ url, body: { ...body, enabled: true }, id })
