import type { IRegistrationService } from "./types/registrationService"

import { usersService } from "@/services/users"

import env from "@/config/environment"
import { URL_API } from "@/helpers/url"

export const RegistrationService: IRegistrationService = {
  async registration(data) {
    return usersService.postUser(data)
      .then(response => {
        if (!response?.error && response?.res?.confirmation_code && env.auto_verification) {
          return this.verification(response?.res?.confirmation_code)
        } else if (!response?.error && response?.res?.confirmation_code && !env.auto_verification) {
          return {
            ok: true,
            error: null,
          }
        }
        return {
          ok: false,
          error: response?.error,
          code: response?.code,
        }
      })
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
          ok: true,
          res: dataResponse?.result,
          error: null,
        }
      }
      return {
        ok: false,
        res: dataResponse?.result,
        error: dataResponse?.error,
        code: dataResponse?.error?.code
      }
    } catch (e) {
      console.error("ERROR VERIFY REQUEST: ", e)
      return {
        ok: false,
        error: e,
      }
    }
  }
}