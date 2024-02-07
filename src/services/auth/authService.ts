import type { IAuthService } from "./types/authService"

import { wrapperPost } from "../requestsWrapper"

export const AuthService: IAuthService = {
  authToken() {
    if (typeof window === "undefined") {
      return ""
    }
    return JSON.parse(localStorage.getItem("auth")!).state.token
  },
  login: (body) => wrapperPost({ url: "/auth/login", body }),
  refresh: (body) => wrapperPost({ url: `/auth/refresh`, body }),
}
