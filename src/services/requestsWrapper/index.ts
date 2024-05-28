import axios, { RawAxiosRequestHeaders, type AxiosHeaders } from "axios"

import type { IReturnData } from "../types/general"
import { IResponseUploadFile } from "../file-upload/types"
import type { MethodDelete, MethodGet, MethodGetId, MethodPatch, MethodPost, MethodUploadFile, TReturnError } from "./types"

import { URL_API } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"

function header(): HeadersInit {
  const head: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (useTokenHelper.authToken) {
    head["Authorization"] = `Bearer ${useTokenHelper.authToken}`
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

export const wrapperGet: MethodGet<any> = ({ url, query, cache }) => {
  const endpoint = new URL(`${URL_API}${url}`)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      endpoint.searchParams.set(key, String(value))
    }
  }

  const requestInit: RequestInit = {
    method: "GET",
    headers: header(),
    cache: cache || "default",
  }

  return returnWrapper(endpoint, requestInit)
}

export const wrapperGetId: MethodGetId<any> = async ({ url, id, query, cache }) => {
  const endpoint = new URL(`${URL_API}${url}/${id}`)

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      endpoint.searchParams.set(key, String(value))
    }
  }

  const requestInit: RequestInit = {
    method: "GET",
    headers: header(),
    cache: cache || "default",
  }

  return returnWrapper(endpoint, requestInit)
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

  if (!useTokenHelper.authToken) {
    return {
      ok: false,
      error: "Not Authorization",
    }
  }

  const requestInit: RequestInit = {
    method: "POST",
    headers: { Authorization: `Bearer ${useTokenHelper.authToken}` },
    body: file,
  }

  return returnWrapper<IResponseUploadFile>(endpoint, requestInit)
}

interface IGet {
  url: string
  query?: object | any
}

const instance = axios.create({
  baseURL: URL_API,
})

const get = async ({ url, query }: IGet): Promise<IReturnData<any>> => {
  let params = {}
  if (query && typeof query === "object") {
    const obj = Object.entries(query).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    params = obj
  }

  const head: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  }

  if (useTokenHelper.authToken) {
    head.Authorization = `Bearer ${useTokenHelper.authToken}`
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

export { get }
