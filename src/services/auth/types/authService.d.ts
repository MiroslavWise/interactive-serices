import type { Dispatch, DispatchWithoutAction } from "react"

export type TSuffix = "Token" | "RefreshToken" | "Expiration" | "UserId"

export interface ISaveToken {
  token: string | null
  refreshToken?: string | null
  expiration: number
  userId: string | number
  ok: boolean
}

export interface IRefreshToken {
  token: string | null
  refreshToken?: string | null
  expiration?: number
  userId?: string | number
  ok: boolean
}

export interface IAuthService {
  public prefix: "AuthJWT"
  public authMap: TSuffix[]
  private saveToken: Dispatch<ISaveToken>
  public validateToken(value: IRefreshToken): boolean
  private setAuthData: Dispatch<{ token: string, refreshToken?: string, expiration?: number, userId: string | number }>
  public removeAuthData: DispatchWithoutAction
  public authToken(): string
  public authRefreshToken(): string
  public authUserId(): string
}