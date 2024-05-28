import type { IUseTokenHelper } from "./types/tokenHelper"

import { URL_API } from "@/helpers/url"
import { AuthService } from "@/services"

export const useTokenHelper: IUseTokenHelper = {
  temporaryToken: "",
  saveTemporaryToken(value) {
    this.temporaryToken = value
  },
  async login(value) {
    return AuthService.login(value).then((response) => {
      if (response.ok && response?.res?.accessToken) {
        this.saveTemporaryToken(response?.res?.accessToken)
        return {
          ok: true,
          res: response?.res,
          error: response?.error,
        }
      }
      return {
        ok: !!response?.res,
        res: response?.res,
        error: response?.error,
      }
    })
  },
  async serviceOtp({ code }) {
    try {
      const responseOtp = await fetch(`${URL_API}/auth/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.temporaryToken}`,
        },
        body: JSON.stringify({ code }),
      })
      const dataOtp = await responseOtp.json()
      if (dataOtp?.error === null && dataOtp?.data) {
        // AuthService.saveToken({ token, refreshToken, userId, ok: true })
        return {
          ok: true,
          error: null,
          res: dataOtp?.data,
        }
      }
      return {
        ok: false,
        error: dataOtp?.error,
      }
    } catch (e) {
      return {
        ok: false,
        error: e,
      }
    }
  },
  get authToken() {
    return AuthService.authToken()
  },
}
