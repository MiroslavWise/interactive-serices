import { AxiosError, type RawAxiosRequestHeaders } from "axios"

import type { IReturnData } from "../types/general"
import type { IResponse, MethodDelete, MethodPatch, MethodPost, TReturnError } from "./types"

import { fetchGet } from "./get"
import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"
import { instance, instanceHeader } from "./instance"
import { invalidAccessTokenRefresh } from "@/helpers/functions/invalid-access-token-refresh"

function returnData<P>(response: any): IReturnData<P> {
  return {
    ok: !!response?.data,
    res: response?.data || null,
    meta: response?.meta || null,
    error: response?.error || null,
  }
}

const returnError: TReturnError = (error) => {
  return {
    ok: false,
    res: null,
    meta: null,
    error: error,
  }
}

async function returnWrapper<P extends any>(endpoint: URL, requestInit: RequestInit) {
  try {
    const response = await fetch(endpoint, requestInit)
    const responseData = await response.json()
    return returnData<P>(responseData)
  } catch (error) {
    return returnError(error)
  }
}

export const wrapperPost: MethodPost<any, any> = async ({ url, body }) => {
  const endpoint = new URL(`${URL_API}${url}`)

  const requestInit: RequestInit = {
    method: "POST",
    headers: instanceHeader(),
  }

  if (body) {
    requestInit.body = JSON.stringify(body)
  }

  return returnWrapper(endpoint, requestInit)
}

export const wrapperPatch: MethodPatch<any, any> = async ({ url, id, body, cache }) => {
  const endpoint = new URL(`${URL_API}${url}${id ? `/${id}` : ""}`)

  const requestInit: RequestInit = {
    method: "PATCH",
    headers: instanceHeader(),
    cache: cache || "default",
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
    headers: instanceHeader(),
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

interface IPost {
  url: string
  body: object | any
}

const post = async ({ url, body }: IPost, isInvalid?: boolean): Promise<IResponse<any>> => {
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
    .post(url, { ...data }, { headers: head })
    .then(async ({ data, status }) => {
      if (status >= 200 && status < 300) {
        if (isInvalid && data?.error?.code === 401) {
          const { ok } = (await invalidAccessTokenRefresh()) ?? {}
          if (ok) {
            const newResponse = await post({ url, body })

            return {
              data: newResponse?.data ?? null,
              error: newResponse?.error ?? null,
              meta: newResponse?.meta,
            }
          }
        }

        return {
          meta: data?.meta || null,
          data: data?.data || null,
          error: data?.error || null,
        }
      } else {
        if (isInvalid && data?.error?.code === 401) {
          const { ok } = (await invalidAccessTokenRefresh()) ?? {}
          if (ok) {
            const newResponse = await post({ url, body })

            return {
              data: newResponse?.data ?? null,
              error: newResponse?.error ?? null,
              meta: newResponse?.meta,
            }
          }
        }

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

export { post, patch, fetchGet }
