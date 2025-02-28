import { IPaginateQuery } from "../types/general"
import type { IServiceUser, IUserResponse, TPatchEmailPasswordUser } from "./types"

import { post, wrapperDelete, patch, fetchGet } from "@/services/request"

const url = "/user"

export interface IQUsers extends IPaginateQuery {
  search?: string
}

export const getUser: IServiceUser["get"] = () => fetchGet({ url })
export const getUsers = (query?: IQUsers) => fetchGet<IUserResponse[]>({ url: `${url}s`, query })
export const getUserId: IServiceUser["getId"] = (id) => fetchGet({ url: `${url}/${id}` })
export const postUser: IServiceUser["post"] = (body, urlSearchParams) =>
  post({ url: `${url}${urlSearchParams ? `/?${urlSearchParams}` : ""}`, body })
export const patchUser: IServiceUser["patch"] = (body, id) => patch({ url: `${url}/${id}`, body })
export const deleteUser: IServiceUser["delete"] = (id) => wrapperDelete({ url, id })
export const getUserEmail: IServiceUser["getEmail"] = (email) => fetchGet({ url: `${url}/email/${email}` })

export const patchEmailPasswordUser: TPatchEmailPasswordUser = (body, id) =>
  patch({ url: `${url}/${id}`, body: { ...body, enabled: true } })

export const pathUserRoles = (roles: number[], id: number) => patch({ url: `${url}/${id}`, body: { roles } })
