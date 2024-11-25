"use client"

import { TAuth, useAuth } from "@/store"
import { instance } from "@/services/request/instance"

function asFalse() {
  useAuth.setState((_) => ({
    user: null,
    auth: null,
    isAuth: false,
  }))
}

export async function invalidAccessTokenRefresh() {
  const auth = useAuth.getState().auth

  if (!auth) {
    asFalse()
    return
  }

  const refreshToken = auth?.refreshToken
  const email = auth?.email

  if (!refreshToken || !email) {
    asFalse()
    return
  }

  try {
    const { data, status } = await instance.post(`/auth/refresh`, { email, refreshToken })

    if (status >= 200 && status < 300) {
      useAuth.setState((_) => ({
        ..._,
        auth: data?.data as TAuth,
        isAuth: true,
      }))
      return { ok: true }
    } else {
      asFalse()
    }
  } catch (e) {
    asFalse()
  }
}
