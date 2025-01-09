import { AxiosError } from "axios"
import { RawAxiosRequestHeaders } from "axios"

import { IResponse, MethodPost } from "./types"

import { instance, instanceHeader } from "./instance"
import { invalidAccessTokenRefresh } from "@/helpers/functions/invalid-access-token-refresh"

import { URL_API } from "@/helpers"
import { returnWrapper } from "./return-wrapper"

export interface IPost {
  url: string
  body: object | any
}

export const post = async ({ url, body }: IPost, isInvalid?: boolean): Promise<IResponse<any>> => {
  let data = {}

  if (typeof body === "object") {
    data = { ...body }
  }

  const headers = instanceHeader()

  return instance
    .post(url, { ...data }, { headers: headers as RawAxiosRequestHeaders })
    .then(async ({ data, status }) => {
      if (status >= 200 && status < 300) {
        if (isInvalid && data?.error?.code === 401) {
          const { ok } = (await invalidAccessTokenRefresh()) ?? {}
          if (ok) {
            const newResponse = await post({ url, body })

            return {
              data: newResponse?.data ?? null,
              error: newResponse?.error ?? null,
              meta: newResponse?.meta,
            }
          }
        }

        return {
          meta: data?.meta || null,
          data: data?.data || null,
          error: data?.error || null,
        }
      } else {
        if (isInvalid && data?.error?.code === 401) {
          const { ok } = (await invalidAccessTokenRefresh()) ?? {}
          if (ok) {
            const newResponse = await post({ url, body })

            return {
              data: newResponse?.data ?? null,
              error: newResponse?.error ?? null,
              meta: newResponse?.meta,
            }
          }
        }

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

export const wrapperPost: MethodPost<any, any> = async ({ url, body }) => {
  const endpoint = new URL(`${URL_API}${url}`)

  const requestInit: RequestInit = {
    method: "POST",
    headers: instanceHeader() as HeadersInit,
  }

  if (body) {
    requestInit.body = JSON.stringify(body)
  }

  return returnWrapper(endpoint, requestInit)
}
