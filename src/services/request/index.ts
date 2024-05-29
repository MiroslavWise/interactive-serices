import axios, { AxiosError, RawAxiosRequestHeaders } from "axios"

import type { IReturnData } from "../types/general"
import type { MethodDelete, MethodPatch, MethodPost, MethodUploadFile, TReturnError } from "./types"

import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"

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

export const wrapperPost: MethodPost<any, any> = async ({ url, body, cache }) => {
  const endpoint = new URL(`${URL_API}${url}`)

  const requestInit: RequestInit = {
    method: "POST",
    headers: header(),
    cache: cache || "default",
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

const postForm: MethodUploadFile = async ({ url, file }) => {
  const fullTokenString = authToken()

  if (!fullTokenString) {
    return {
      ok: false,
      error: "Not Authorization",
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
        console.log("onUploadProgress event total: ", event.total)
        console.log("onUploadProgress event loaded: ", event.loaded)
      },
    })
    .then(({ data, status }) => {
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

interface IGet {
  url: string
  query?: object | any
}

interface IPatch {
  url: string
  body: object | any
}

const patch = async ({ url, body }: IPatch): Promise<IReturnData<any>> => {
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

interface IPost {
  url: string
  body: object | any
}

const post = async ({ url, body }: IPost): Promise<IReturnData<any>> => {
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

export { get, post, patch, postForm }
