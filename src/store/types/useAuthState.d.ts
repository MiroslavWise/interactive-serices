import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import { IUserOffer } from "@/services/offers/types"
import { IReturnData } from "@/services/types/general"
import type { DispatchWithoutAction, Dispatch } from "react"

export type TAuthSuffix = "AuthJWT"
export type TAuthPostfix = "RefreshToken" | "Token" | "UserId"
export type ISetAction = (
  partial: TUseAuth | Partial<TUseAuth> | ((state: TUseAuth) => TUseAuth | Partial<TUseAuth>),
  replace?: boolean | undefined,
) => void
export type IGetAction = () => TUseAuth
export interface ISetToken {
  token: string
  refreshToken: string
  userId: number
  expires: number
  ok: boolean
  email: string
}

export interface IImageData {
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

export interface IAuthState {
  email?: string
  expires?: number
  token?: string
  refreshToken?: string
  userId?: number
  profileId?: number
  isAuth?: boolean
  user?: IUserOffer
  imageProfile?: IImageData
  createdUser?: string | Date
  addresses?: IAddressesResponse[]
  roles: objRole[] | null
}

export interface IAuthAction {
  updateProfile: DispatchWithoutAction
  refresh(): Promise<{ ok: boolean }>
  getUser: Dispatch<(IUser & { profileId: number }) | null>
  changeAuth: DispatchWithoutAction
  setToken: Dispatch<ISetToken>
  signOut: DispatchWithoutAction
}
export type TUseAuth = IAuthState & IAuthAction
