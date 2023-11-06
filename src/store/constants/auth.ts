import { TAuthPostfix, TAuthSuffix } from "../types/useAuthState"

export const prefix: TAuthSuffix = "AuthJWT"
export const authMap: TAuthPostfix[] = [
    "RefreshToken",
    "Token",
    "UserId",
]
