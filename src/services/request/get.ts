import { type IResponse } from "./types"

import { URL_API } from "@/helpers"
import { authToken } from "../auth/authService"
import { invalidAccessTokenRefresh } from "@/helpers/functions/invalid-access-token-refresh"

interface IGet {
  url: string
  query?: object | any
}

export async function fetchGet<T = any>({ url, query }: IGet, isInvalid?: boolean): Promise<IResponse<T>> {
  const endpoint = new URL(`${URL_API}${url}`)
  if (query && typeof query === "object") {
    for (const [key, value] of Object.entries(query)) {
      endpoint.searchParams.append(key, typeof value === "string" ? value : String(value))
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

    const responseAwait = (await response.json()) as IResponse

    const { data, error, meta } = responseAwait

    if (isInvalid && error?.code === 401) {
      const { ok } = (await invalidAccessTokenRefresh()) ?? {}
      if (ok) {
        const newResponse = await fetchGet({ url, query })

        return {
          data: newResponse?.data ?? null,
          error: newResponse?.error ?? null,
          meta: newResponse?.meta,
        }
      }
    }

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
