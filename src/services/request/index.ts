import type { IResponse, MethodDelete, MethodPatch } from "./types"

import { fetchGet } from "./get"
import { URL_API } from "@/helpers"
import { returnWrapper } from "./return-wrapper"
import { instance, instanceHeader } from "./instance"
import { type IPost, post, wrapperPost } from "./post"

export const wrapperPatch: MethodPatch<any, any> = async ({ url, id, body }) => {
  const endpoint = new URL(`${URL_API}${url}${id ? `/${id}` : ""}`)

  const requestInit: RequestInit = {
    method: "PATCH",
    headers: instanceHeader() as HeadersInit,
  }

  if (body) {
    requestInit.body = JSON.stringify(body)
  }

  return returnWrapper(endpoint, requestInit)
}

export const wrapperDelete: MethodDelete = async ({ url, id }) => {
  const endpoint = new URL(`${URL_API}${url}/${id}`)

  const requestInit: RequestInit = {
    method: "DELETE",
    headers: instanceHeader() as HeadersInit,
  }

  return returnWrapper(endpoint, requestInit)
}

interface IPatch extends IPost {}

const patch = async ({ url, body }: IPatch): Promise<IResponse<any>> => {
  let data = {}

  if (typeof body === "object") {
    data = { ...body }
  }

  return instance.patch(url, { ...data }).then((response) => response as unknown as IResponse)
}

export { post, patch, fetchGet, wrapperPost }
