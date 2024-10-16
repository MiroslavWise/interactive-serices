import { type IResponse } from "./types"

import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"

interface IGet {
  url: string
  query?: object | any
}

export async function fetchGet<T = any>({ url, query }: IGet): Promise<IResponse<T>> {
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
      data: data ?? null,
      error: error ?? null,
      meta: meta,
    }
  } catch (e) {
    console.log("catch: e:", e)
    return {
      data: null,
      error: e,
    }
  }
}
