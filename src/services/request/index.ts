import axios, { RawAxiosRequestHeaders } from "axios"

import type { IReturnData } from "../types/general"
import { IResponseUploadFile } from "../file-upload/types"
import type { MethodDelete, MethodPatch, MethodPost, MethodUploadFile, TReturnError } from "./types"

import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"

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

export const wrapperUploadFile: MethodUploadFile = async ({ url, file }) => {
  const endpoint = new URL(`${URL_API}${url}`)

  const fullTokenString = authToken()

  if (!fullTokenString) {
    return {
      ok: false,
      error: "Not Authorization",
    }
  }

  const requestInit: RequestInit = {
    method: "POST",
    headers: { Authorization: fullTokenString },
    body: file,
  }

  return returnWrapper<IResponseUploadFile>(endpoint, requestInit)
}

interface IGet {
  url: string
  query?: object | any
}

export const instance = axios.create({
  baseURL: URL_API,
})

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

  try {
    const response = await instance.patch(url, { ...data }, { headers: head })

    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        meta: response.data?.meta,
        res: response.data?.data,
        error: response.data?.error || null,
      }
    } else {
      return {
        ok: false,
        error: response.data?.error,
      }
    }
  } catch (e) {
    return {
      ok: false,
      error: e,
    }
  }
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

  try {
    const response = await instance.post(url, { ...data }, { headers: head })

    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        meta: response.data?.meta,
        res: response.data?.data,
        error: response.data?.error || null,
      }
    } else {
      return {
        ok: false,
        error: response.data?.error,
      }
    }
  } catch (e) {
    return {
      ok: false,
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

  try {
    const response = await instance.get(url, { headers: head, params: params })

    if (response.status >= 200 && response.status <= 299) {
      return {
        ok: true,
        meta: response.data?.meta,
        res: response.data?.data,
        error: response.data?.error || null,
      }
    } else {
      return {
        ok: false,
        error: response.data?.error,
      }
    }
  } catch (e) {
    return {
      ok: false,
      error: e,
    }
  }
}

export { get, post, patch }
