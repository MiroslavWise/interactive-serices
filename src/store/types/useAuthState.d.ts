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

export interface IImageData{
  id: number
  attributes: {
    alt: string
    caption: string
    ext: string
    hash: string
    height: number
    mime: string
    name: string
    provider: string
    size: number
    url: string
    width: number
  }
}

export interface IUseAuth {
  public token: string | undefined
  public refreshToken: string | undefined
  public userId: number | undefined
  public profileId: number | undefined
  public expiration: number | undefined
  public isAuth: boolean
  public user: IUser | undefined
  public imageProfile: IImageData | undefined
  public createdUser: string | undefined | Date
  
  public setUser: Dispatch<IUser & { profileId: number } | null>
  public changeAuth: DispatchWithoutAction
  public setToken: Dispatch<ISetToken>
  public signOut: DispatchWithoutAction
  public retrieveProfileData: DispatchWithoutAction
}