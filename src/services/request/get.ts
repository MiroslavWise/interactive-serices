import { type IResponse } from "./types"

import { URL_API } from "@/helpers"

import { handleError } from "./error"
import { createHeaders } from "./header"
import { invalidAccessTokenRefresh } from "@/helpers/functions/invalid-access-token-refresh"

interface IGet {
  url: string
  query?: object | any
}

/** Функция для создания URL с query-параметрами */
const createEndpoint = (url: string, query?: Record<string, any>): URL => {
  const endpoint = new URL(`${URL_API}${url}`)
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      endpoint.searchParams.append(key, typeof value === "string" ? value : String(value))
    })
  }
  return endpoint
}

export async function fetchGet<T = any>({ url, query }: IGet, isInvalid?: boolean): Promise<IResponse<T>> {
  const endpoint = createEndpoint(url, query)
  const headers = createHeaders()

  const dataRequestInit: RequestInit = { method: "GET", headers }

  try {
    const response = await fetch(endpoint, { ...dataRequestInit })

    const responseAwait = (await response.json()) as IResponse<T>

    const { data, error, meta } = responseAwait

    if (isInvalid && error?.code === 401) {
      const { ok } = (await invalidAccessTokenRefresh()) ?? {}
      if (ok) {
        const newResponse = await fetchGet({ url, query })

        return {
          data: newResponse?.data ?? null,
          error: newResponse?.error ?? null,
          meta: newResponse?.meta,
          status: 200,
        }
      }
    }

    return {
      data: data ?? null,
      error: error ?? null,
      meta: meta,
      status: error?.code ?? 400,
    }
  } catch (e) {
    return handleError(e)
  }
}
