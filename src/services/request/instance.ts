import axios, { RawAxiosRequestHeaders } from "axios"

import { URL_API } from "@/helpers"

import { authToken } from "../auth/authService"

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

export const instance = axios.create({
  baseURL: URL_API,
})
