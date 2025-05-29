import { AxiosError } from "axios"
import { IResponse } from "../request/types"
import { type TSchemaEmailSignIn } from "@/components/templates/ModalSign/utils/email-sign-in.schema"

import { clg } from "@console"
import { instance } from "../request/instance"
import { isTokenExpired, useAuth, type TAuth } from "@/store"

const url = "/auth"

export async function login({ email, password }: TSchemaEmailSignIn): Promise<IResponse<TAuth>> {
  const body: TSchemaEmailSignIn = { email, password }

  const response = await instance.post(`${url}/login`, { ...body })

  return response as unknown as IResponse<TAuth>
}

export async function refresh() {
  const auth = useAuth.getState().auth

  if (!auth) return { ok: false }

  const expires = auth?.expires
  const refreshToken = auth?.refreshToken
  const email = auth?.email

  const boolean = isTokenExpired(expires ? Number(expires) : undefined)

  try {
    const body = { email, refreshToken }

    if (boolean) {
      const response = (await instance.post(`${url}/refresh`, { ...body })) as IResponse<any>

      if (response.status >= 200 && response.status <= 300) {
        return {
          data: response?.data,
          error: null,
        }
      } else {
        return {
          data: null,
          error: response.error,
        }
      }
    } else {
      return {
        data: auth,
        error: null,
      }
    }
  } catch (e) {
    return {
      data: null,
      error: e,
    }
  }
}

export function authToken(): string | null {
  if (typeof window === "undefined") return null
  const auth = useAuth.getState().auth
  if (!auth) return null
  const typeToken = auth?.tokenType
  const accessToken = auth?.accessToken

  return accessToken && typeToken ? `${typeToken} ${accessToken}` : null
}
