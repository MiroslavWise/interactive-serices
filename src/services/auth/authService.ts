import type {
  ISaveToken,
  IRefreshToken,
  IAuthService,
} from "./types/authService"

export const AuthService: IAuthService = {
  prefix: "AuthJWT",
  authMap: ["RefreshToken", "Token", "Expiration", "UserId"],
  saveToken({ token, refreshToken, expiration, userId, ok }: ISaveToken): void {
    if (ok && token && refreshToken) {
      this.setAuthData({ token, refreshToken, expiration, userId })
    } else {
      this.removeAuthData()
    }
  },
  validateToken({ token, refreshToken, expiration, userId, ok }: IRefreshToken): boolean {
    if (ok && token && refreshToken && userId) {
      this.setAuthData({ token, refreshToken, expiration, userId })
      return true
    } else {
      this.removeAuthData()
      return false
    }
  },
  setAuthData({ token, refreshToken, expiration, userId }) {
    localStorage.setItem(`${this.prefix}.Token`, token!)
    localStorage.setItem(`${this.prefix}.RefreshToken`, refreshToken!)
    localStorage.setItem(`${this.prefix}.Expiration`, expiration!.toString())
    localStorage.setItem(`${this.prefix}.UserId`, userId!.toString())
  },
  removeAuthData() {
    this.authMap.forEach(item => {
      localStorage.removeItem(`${this.prefix}.${item}`)
    })
  },
  authToken() {
    return JSON.parse(localStorage.getItem("auth")!).state.token
  },
  authRefreshToken() {
    return JSON.parse(localStorage.getItem("auth")!).state.refreshToken!
  },
  authUserId() {
    return JSON.parse(localStorage.getItem("auth")!).state.userId!
  }
}