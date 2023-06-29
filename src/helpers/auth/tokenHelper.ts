import type { IUseTokenHelper } from "./types/tokenHelper"

import { saveToken, validateToken, prefix, authMap } from "./services/tokenService"
import { URL_API } from "@/helpers/url"

export const useTokenHelper: IUseTokenHelper = {
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
      const token = responseData?.data?.access_token
      const refreshToken = responseData?.data?.refresh
      saveToken({ token, refreshToken, ok: true })
      return {
        login: true,
      }
    } catch (e) {
      saveToken({ token: null, refreshToken: null, ok: false })
      return {
        login: false,
        error: e,
      }
    }
  },
  async refresh() {
    try {
      // this.authRefreshToken
      const response = await Promise.reject()
      validateToken({ token: "", refreshToken: "", ok: true })
      return {
        login: validateToken({ token: "", refreshToken: "", ok: true }),
      }
    } catch (e) {
      validateToken({ token: null, refreshToken: null, ok: false })
      return {
        login: false,
        error: e,
      }
    }
  },
  get authToken() {
    return localStorage.getItem(`${prefix}.Token`)!
  },
  get authRefreshToken() {
    return localStorage.getItem(`${prefix}.RefreshToken`)!
  },
  get isAuth() {
    return authMap.some(item => localStorage.getItem(`${prefix}.${item}`) !== null)
  },
}