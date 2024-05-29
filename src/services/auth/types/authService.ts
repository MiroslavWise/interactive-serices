import type { IReturnData } from "@/services/types/general"
import { type TAuth } from "@/store"

export type TPostfix = "Token" | "RefreshToken" | "UserId"

export interface ISaveToken {
  token: string | null
  refreshToken?: string | null
  userId: string | number
  ok: boolean
}

export interface IRefreshToken {
  token: string | null
  refreshToken?: string | null
  userId?: string | number
  ok: boolean
}

export interface IAuthService {
  authToken(): string
  login(value: IRequestLogin): Promise<IReturnData<IResponseLoginOtp & IResponseLoginNot2fa>>
  refresh(values: IRequestRefresh): Promise<IReturnData<IResponseRefresh>>
}

export interface IRequestLogin {
  email: string
  password: string
}

export interface IResponseLoginOtp {
  accessToken: string
  secret?: string
  otpAuthUrl?: string
}

export interface IResponseLoginNot2fa extends TAuth {}

export interface IRequestRefresh {
  refreshToken: string
  email: string
}

export interface IResponseRefresh {
  id: number
  accessToken: string
  scope: string
  tokenType: string
  expires: number
}
