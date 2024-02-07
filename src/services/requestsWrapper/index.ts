import { URL_API } from "@/helpers"
import { useTokenHelper } from "@/helpers/auth/tokenHelper"
import type { IWrapperFetch, TReturnData, TReturnError } from "./types"

function header(): HeadersInit {
  const head: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (useTokenHelper.authToken) {
    head["Authorization"] = `Bearer ${useTokenHelper.authToken}`
  }

  return head
}

const returnData: TReturnData = (response) => {
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

const returnWrapper = async (endpoint: URL, requestInit: RequestInit) => {
  try {
    const response = await fetch(endpoint, requestInit)
    const responseData = await response.json()
    return returnData(responseData)
  } catch (error) {
    return returnError(error)
  }
}

export const wrapperGet: IWrapperFetch["MethodGet"] = async ({ url, query, cache }) => {
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

export const wrapperGetId: IWrapperFetch["MethodGetId"] = async ({ url, id, query, cache }) => {
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

export const wrapperPost: IWrapperFetch["MethodPost"] = async ({ url, body, cache }) => {
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

export const wrapperPatch: IWrapperFetch["MethodPatch"] = async ({ url, id, body, cache }) => {
  const endpoint = new URL(`${URL_API}${url}/${id}`)

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

export const wrapperDelete: IWrapperFetch["MethodDelete"] = async ({ url, id }) => {
  const endpoint = new URL(`${URL_API}${url}/${id}`)

  const requestInit: RequestInit = {
    method: "DELETE",
    headers: header(),
  }

  return returnWrapper(endpoint, requestInit)
}

export const wrapperUploadFile: IWrapperFetch["MethodUploadFile"] = async ({ url, file }) => {
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

  return returnWrapper(endpoint, requestInit)
}
