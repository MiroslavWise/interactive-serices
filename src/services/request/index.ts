import axios, { AxiosError, type RawAxiosRequestHeaders } from "axios"

import { EStatusAuth } from "@/types/enum"
import type { IMetaData, IReturnData } from "../types/general"
import type { MethodDelete, MethodPatch, MethodPost, MethodUploadFile, TReturnError } from "./types"

import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"

interface I<T = any> {
  data: T | null
  error: any | null
  meta?: IMetaData
}

export type IResponse<T = any> = Readonly<I<T>>

export const instance = axios.create({
  baseURL: URL_API,
})

function header(): HeadersInit {
  const head: HeadersInit = {
    "Content-Type": "application/json",
  }

  const fullTokenString = authToken()

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  return head
}

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
    headers: header(),
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
    headers: header(),
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
    headers: header(),
  }

  return returnWrapper(endpoint, requestInit)
}

const postForm: MethodUploadFile = async ({ url, file, onUploadProgress }) => {
  const fullTokenString = authToken()

  if (!fullTokenString) {
    return {
      data: null,
      error: EStatusAuth.NOT_AUTHORIZATION,
    }
  }

  const head: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  }

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  return instance
    .postForm(url, file, {
      headers: head,
      onUploadProgress: (event) => {
        if (onUploadProgress) {
          onUploadProgress(event, file.get("caption"))
        }
      },
    })
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

interface IGet {
  url: string
  query?: object | any
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

const post = async ({ url, body }: IPost): Promise<IResponse<any>> => {
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

const fetchGet = async ({ url, query }: IGet): Promise<IResponse> => {
  const endpoint = new URL(`${URL_API}${url}`)
  if (query && typeof query === "object") {
    for (const [key, value] of Object.entries(query)) {
      endpoint.searchParams.set(key, String(value))
    }
  }

  const head: HeadersInit = {
    "Content-Type": "application/json",
  }

  const fullTokenString = authToken()

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  const dataRequestInit: RequestInit = {
    method: "GET",
    headers: head,
  }

  try {
    const response = await fetch(endpoint, { ...dataRequestInit })

    const { data, error, meta } = (await response.json()) as IResponse

    return {
      data: data,
      error: error,
      meta: meta,
    }
  } catch (e) {
    return {
      data: null,
      error: e,
    }
  }
}

const get = async ({ url, query }: IGet): Promise<IReturnData<any>> => {
  let params = {}
  if (query && typeof query === "object") {
    const obj = Object.entries(query).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    params = obj
  }

  const head: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  }

  const fullTokenString = authToken()

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  return instance
    .get(url, { headers: head, params: params })
    .then(({ data, status }) => {
      // console.log("url get: ", url)
      // console.log("data get: ", data)
      if (status >= 200 && status < 300) {
        return {
          ok: true,
          meta: data?.meta || null,
          res: data?.data || null,
          error: data?.error || null,
        }
      } else {
        return {
          ok: false,
          meta: data?.meta || null,
          res: data?.data || null,
          error: data?.error || null,
        }
      }
    })
    .catch((error) => {
      // console.log("url get: ", url)
      // console.log("error get: ", error)
      if (error instanceof AxiosError) {
        const e = error?.response?.data?.error
        return {
          ok: false,
          error: e,
        }
      }

      return {
        ok: false,
        error: error,
      }
    })
}

export { get, post, patch, postForm, fetchGet }
