import { AxiosError } from "axios"
import { type IReturnData } from "../types/general"
import { type TSchemaEmailSignIn } from "@/components/templates/ModalSign/utils/email-sign-in.schema"

import { instance } from "../request"
import { isTokenExpired, useAuth, type TAuth } from "@/store"

const url = "/auth"

export async function login({ email, password }: TSchemaEmailSignIn): Promise<IReturnData<TAuth>> {
  try {
    const body: TSchemaEmailSignIn = { email, password }

    const { data, status } = await instance.post(`${url}/login`, { ...body })

    if (status >= 200 && status < 300) {
      return {
        ok: true,
        res: data?.data,
        error: null,
        meta: data?.meta,
      }
    }

    return {
      ok: false,
      res: null,
      error: data?.error,
      meta: null,
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e?.response?.data?.error
      return {
        ok: false,
        error: error,
      }
    }

    return {
      ok: false,
      error: e,
    }
  }
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
      const { data, status } = await instance.post(`${url}/refresh`, { ...body })

      if (status >= 200 && status < 300) {
        return {
          ok: true,
          res: data?.data,
        }
      } else {
        return {
          ok: false,
        }
      }
    } else {
      return {
        ok: true,
        res: auth,
      }
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = e?.response?.data?.error
      return {
        ok: false,
        error: error,
      }
    }

    return {
      ok: false,
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
