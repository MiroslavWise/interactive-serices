import { AxiosError, type RawAxiosRequestHeaders } from "axios"

import type { IResponse, MethodDelete, MethodPatch } from "./types"

import { fetchGet } from "./get"
import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"
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
  const head: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  }

  let data = {}

  if (typeof body === "object") {
    data = { ...body }
  }

  const fullTokenString = authToken()

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  return instance
    .patch(
      url,
      { ...data },
      {
        headers: head,
      },
    )
    .then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        return {
          meta: data?.meta || null,
          data: data?.data || null,
          error: data?.error || null,
        }
      } else {
        return {
          meta: data?.meta || null,
          data: data?.data || null,
          error: data?.error || null,
        }
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        const e = error?.response?.data?.error
        return {
          data: null,
          error: e,
        }
      }

      return {
        data: null,
        error: error,
      }
    })
}

export { post, patch, fetchGet, wrapperPost }
