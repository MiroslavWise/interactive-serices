import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios"

import { IMetaData } from "../types/general"

import { URL_API } from "@/helpers"
import { authToken, refresh } from "../auth/authService"
import { IResponse } from "./types"

export function instanceHeader(): HeadersInit | RawAxiosRequestHeaders {
  const head: HeadersInit = {
    "Content-Type": "application/json",
  }

  const fullTokenString = authToken()

  if (fullTokenString) {
    head.Authorization = fullTokenString
  }

  return head
}

interface IResponseSuccess<P = any> {
  data: P
  error: any | null
  meta: IMetaData | null
}

const instance = axios.create({
  baseURL: URL_API,
  timeout: 20_000,
})

instance.interceptors.request.use((config) => {
  const fullTokenString = authToken()

  if (fullTokenString) {
    config.headers.Authorization = fullTokenString
  }

  return config
})

instance.interceptors.response.use(
  //@ts-ignore
  (response) => formatSuccessResponse(response) as IResponse,
  (error) => formatErrorResponse(error),
)

const formatSuccessResponse = (response: AxiosResponse<IResponseSuccess, any>) => {
  const newResponse = {
    data: response.data.data,
    meta: response.data.meta,
    error: response.data.error,
    status: response.status,
  }

  return newResponse as IResponse
}

const formatErrorResponse = async (error: any) => {
  const originalRequest = error.config

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    await refresh()
    return instance(originalRequest)
  }

  if (error.response) {
    return Promise.resolve({
      data: null,
      meta: null,
      error: error.response.data?.error,
      status: error.response.status,
    })
  }

  if (error.request) {
    return Promise.resolve({
      data: null,
      meta: null,
      error: { message: "Network Error" },
      status: null,
    })
  }

  // Ошибка при настройке запроса
  return Promise.resolve({
    data: null,
    meta: null,
    error: { message: error.message },
    status: null,
  })
}

export { instance }
