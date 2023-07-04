import type { IUseTokenHelper } from "./types/tokenHelper"

import { AuthService } from "@/services/auth/authService"
import { URL_API } from "@/helpers/url"

export const useTokenHelper: IUseTokenHelper = {
  temporaryToken: "",
  async login({ email, password }) {
    try {
      const data = {
        email: email,
        password: password,
      }
      const response = await fetch(`${URL_API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const responseData = await response.json()
      if (responseData?.error === null && responseData?.result?.access_token) {
        this.temporaryToken = responseData?.result?.access_token
        return {
          login: true,
          secret: responseData?.result?.secret,
          otp_auth_url: responseData?.result?.otp_auth_url,
        }
      }
      return {
        login: false,
        error: responseData?.error,
      }
    } catch (e) {
      return {
        login: false,
        error: e,
      }
    }
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
  async serviceOtp(value) {
    try {
      const responseOtp = await fetch(`${URL_API}/auth/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.temporaryToken}`,
        },
        body: JSON.stringify({ code: value })
      })
      const dataOtp = await responseOtp.json()
      if (dataOtp?.error === null && dataOtp?.result) {
        const token = dataOtp?.result?.access_token
        const refreshToken = dataOtp?.result?.refresh_token
        const expiration = dataOtp?.result?.expires_in
        const userId = dataOtp?.result?.user_id
        AuthService.saveToken({ token, refreshToken, expiration, userId, ok: true })
        return {
          ok: true,
          error: null,
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
  get isAuth() {
    if (typeof window !== 'undefined') {
      return AuthService.authMap.some(item => localStorage.getItem(`${AuthService.prefix}.${item}`))
    }
    return false
  },
}