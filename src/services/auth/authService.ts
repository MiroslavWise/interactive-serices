import type {
  ISaveToken,
  IRefreshToken,
  IAuthService,
} from "./types/authService"

export const AuthService: IAuthService = {
  prefix: "AuthJWT",
  authMap: ["RefreshToken","Token", "Expiration"],
  saveToken({ token, refreshToken, expiration, ok }: ISaveToken): void {
    if (ok && token && refreshToken) {
      this.setAuthData({ token, refreshToken, expiration })
    } else {
      this.removeAuthData()
    }
  },
  validateToken({ token, refreshToken, expiration, ok }: IRefreshToken): boolean {
    if (ok && token && refreshToken) {
      this.setAuthData({ token, refreshToken, expiration })
      return true
    } else {
      this.removeAuthData()
      return false
    }
  },
  setAuthData({ token, refreshToken, expiration }) {
    localStorage.setItem(`${this.prefix}.Token`, token!)
    localStorage.setItem(`${this.prefix}.RefreshToken`, refreshToken!)
    localStorage.setItem(`${this.prefix}.Expiration`, expiration!.toString())
  },
  removeAuthData() {
    this.authMap.forEach(item => {
      localStorage.removeItem(`${this.prefix}.${item}`)
    })
  },
  authToken() {
    return localStorage.getItem(`${this.prefix}.Token`)!
  },
  authRefreshToken() {
    return localStorage.getItem(`${this.prefix}.RefreshToken`)!
  }
}