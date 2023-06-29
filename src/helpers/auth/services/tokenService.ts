import type {
  ISaveToken,
  IRefreshToken,
  TSuffix,
} from "../types/tokenService"

export const prefix = "AuthJWT"
export const authMap: TSuffix[] = [
  "RefreshToken",
  "Token",
  // "Expiration"
]

export function saveToken({ token, refreshToken, ok }: ISaveToken): void {
  if (ok) {
    setAuthData(token!, refreshToken!)
  } else {
    removeAuthData()
  }
}

export function validateToken({ token, refreshToken, ok }: IRefreshToken): boolean {
  if (ok) {
    setAuthData(token!, refreshToken!)
    return true
  } else {
    removeAuthData()
    return false
  }
}

export function setAuthData(token: string, refreshToken: string) {
  localStorage.setItem(`${prefix}.Token`, token!)
  localStorage.setItem(`${prefix}.RefreshToken`, refreshToken!)
  // localStorage.setItem(`${prefix}.Expiration`, expiration!)
}

export function removeAuthData() {
  authMap.forEach(item => {
    localStorage.removeItem(`${prefix}.${item}`)
  })
}