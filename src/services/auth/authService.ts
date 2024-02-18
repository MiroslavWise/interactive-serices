import type { IAuthService } from "./types/authService"

import { wrapperPost } from "../requestsWrapper"

const route = "/auth"

export const AuthService: IAuthService = {
  authToken() {
    if (typeof window === "undefined") {
      return ""
    }
    return JSON.parse(localStorage.getItem("auth")!).state.token
  },
  login: (body) => wrapperPost({ url: `${route}/login`, body }),
  refresh: (body) => wrapperPost({ url: `${route}/refresh`, body }),
}
