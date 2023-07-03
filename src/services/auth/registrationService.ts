import type { IRegistrationService } from "./types/registrationService"

import env from "@/config/environment"
import { URL_API } from "@/helpers/url"

export const RegistrationService: IRegistrationService = {
  async registration({ email, password, repeat }) {
    try {
      const data = { email, password, repeat }
      const res = await fetch(`${URL_API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const dataResponse = await res.json()
      if (!dataResponse?.error && dataResponse?.result?.confirmation_code && env.auto_verification) {
        return this.verification(dataResponse?.result?.confirmation_code)
      } else if (!dataResponse?.error && dataResponse?.result?.confirmation_code && !env.auto_verification) {
        return {
          registration: true,
          error: null,
          need_verify: true,
        }
      }
      return {
        registration: false,
        code: dataResponse?.error?.code,
        error: dataResponse?.error,
      }
    } catch (e) {
      return {
        registration: false,
        error: e
      }
    }
  },
  async verification(value) {
    try {
      const data = { code: value }
      const res = await fetch(`${URL_API}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const dataResponse = await res.json()
      if (dataResponse?.error === null && !!dataResponse?.result?.id) {
        return {
          registration: true,
          error: null,
        }
      } else {
        return {
          registration: false,
          error: dataResponse?.error,
          message: dataResponse?.error?.message,
        }
      }
    } catch (e) {
      console.error("ERROR VERIFY REQUEST: ", e)
      return {
        registration: false,
        error: e,
        message: "error request",
      }
    }
  }
}