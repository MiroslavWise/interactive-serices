import { type IReturnData } from "../types/general"
import { type TSchemaEmailSignIn } from "@/components/templates/ModalSign/utils/email-sign-in.schema"

import { instance } from "../request"
import { isTokenExpired, NAME_STORAGE_USE_AUTH, type TAuth } from "@/store"

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
    return {
      ok: false,
      error: e,
    }
  }
}

export async function refresh() {
  const email = JSON.parse(localStorage.getItem(NAME_STORAGE_USE_AUTH)!).state.user?.email as string
  const refreshToken = JSON.parse(localStorage.getItem(NAME_STORAGE_USE_AUTH)!).state.auth?.refreshToken as string
  const expires = JSON.parse(localStorage.getItem(NAME_STORAGE_USE_AUTH)!).state.auth?.expires as number
  const auth = JSON.parse(localStorage.getItem(NAME_STORAGE_USE_AUTH)!).state.auth as TAuth

  if (!email || !refreshToken) return { ok: false }

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
    return {
      ok: false,
    }
  }
}

export function authToken(): string | null {
  if (typeof window === "undefined") return null

  const typeToken = JSON.parse(localStorage.getItem(NAME_STORAGE_USE_AUTH)!).state.auth?.tokenType
  const token = JSON.parse(localStorage.getItem(NAME_STORAGE_USE_AUTH)!).state.auth?.accessToken

  return token && typeToken ? `${typeToken} ${token}` : null
}
