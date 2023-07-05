import type { IForgotPasswordService } from "./types/forgotPasswordService"

import { URL_API } from "@/helpers"

export const ForgotPasswordService: IForgotPasswordService = {
  async emailRequest({ email }) {
    try {
      const response = await fetch(`${URL_API}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (data?.result && data?.error === null) {
        return {
          ok: true,
          res: data?.result,
        }
      }
      return {
        ok: false,
        res: null,
        error: data?.error,
        code: data?.error?.code,
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      }
    }
  },
  async passwordRecovery({ token, password, repeat }) {
    try {
      const response = await fetch(`${URL_API}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password, repeat }),
      })
      const data = await response.json()
      if (data?.result && data?.error === null) {
        return {
          ok: true,
          res: data?.result,
        }
      }
      return {
        ok: false,
        res: null,
        error: data?.error,
        code: data?.error?.code,
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      }
    }
  }
}