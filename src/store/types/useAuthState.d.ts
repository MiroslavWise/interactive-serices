import type { DispatchWithoutAction, Dispatch } from "react"

export type TAuthSuffix = "AuthJWT"
export type TAuthPostfix = "RefreshToken" | "Token" | "Expiration" | "UserId"
export type ISetAction = (partial: IUseAuth | Partial<IUseAuth> | ((state: IUseAuth) => IUseAuth | Partial<IUseAuth>), replace?: boolean | undefined) => void
export type IGetAction = () => IUseAuth
interface ISetToken{
  token: string
  refreshToken: string
  expiration: number
  userId: number
  ok: boolean
}

interface IUser{
  firstName: string
  lastName: string
  username: string
  birthdate: Date | string
  about?: string
  enabled: boolean
}

export interface IUseAuth {
  public token: string | undefined
  public refreshToken: string | undefined
  public userId: number | undefined
  public profileId: number | undefined
  public expiration: number | undefined
  public isAuth: boolean
  public user: IUser | undefined
  
  public setUser: Dispatch<IUser & { profileId: number } | null>
  public changeAuth: DispatchWithoutAction
  public setToken: Dispatch<ISetToken>
  public signOut: DispatchWithoutAction
}