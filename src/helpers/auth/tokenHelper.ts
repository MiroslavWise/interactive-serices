import type { IUseTokenHelper } from "./types/tokenHelper"

import { LoggingService } from "@/services/auth/loggingService"
import { AuthService } from "@/services/auth/authService"
import { URL_API } from "@/helpers/url"

export const useTokenHelper: IUseTokenHelper = {
  temporaryToken: "",
  saveTemporaryToken(value) {
    this.temporaryToken = value
  },
  async login(value) {
    return LoggingService.login(value)
      .then(response => {
        if (response.ok && response?.res?.access_token) {
          this.saveTemporaryToken(response?.res?.access_token)
          return {
            ok: true,
            res: response?.res,
            error: null
          }
        }
        return {
          ok: !!response?.res,
          res: response?.res,
          error: response?.error,
          code: response?.code,
        }
      })
  },
  async refresh() {
    try {
      this.authRefreshToken
      const response = await Promise.reject()
      AuthService.validateToken({ token: "", refreshToken: "", ok: true })
      return {
        login: AuthService.validateToken({ token: "", refreshToken: "", ok: true }),
      }
    } catch (e) {
      AuthService.validateToken({ token: null, refreshToken: null, ok: false })
      return {
        login: false,
        error: e,
      }
    }
  },
  async serviceOtp({ code }) {
    try {
      const responseOtp = await fetch(`${URL_API}/auth/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.temporaryToken}`,
        },
        body: JSON.stringify({ code })
      })
      const dataOtp = await responseOtp.json()
      if (dataOtp?.error === null && dataOtp?.result) {
        const token = dataOtp?.result?.access_token
        const refreshToken = dataOtp?.result?.refresh_token
        const expiration = dataOtp?.result?.expires_in
        const userId = dataOtp?.result?.id
        // AuthService.saveToken({ token, refreshToken, expiration, userId, ok: true })
        return {
          ok: true,
          error: null,
          res: dataOtp?.result,
        }
      }
      AuthService.removeAuthData()
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
  get authRefreshToken() {
    return AuthService.authRefreshToken()
  },
  get authUserId() {
    return AuthService.authUserId()
  },
}