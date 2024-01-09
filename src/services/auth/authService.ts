import type {
    IAuthService,
    IRequestLogin,
    IRequestRefresh,
    IResponseLoginNot2fa,
    IResponseLoginOtp,
    IResponseRefresh,
} from "./types/authService"

import { wrapperFetch } from "../requestsWrapper"

export const AuthService: IAuthService = {
    authToken() {
        if (typeof window === "undefined") {
            return ""
        }
        return JSON.parse(localStorage.getItem("auth")!).state.token
    },
    login(values) {
        return wrapperFetch.methodPost<IRequestLogin, IResponseLoginOtp & IResponseLoginNot2fa>("/auth/login", values)
    },
    refresh(values) {
        return wrapperFetch.methodPost<IRequestRefresh, IResponseRefresh>(`/auth/refresh`, values)
    },
}
