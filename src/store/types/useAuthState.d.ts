import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import type { DispatchWithoutAction, Dispatch } from "react"

export type TAuthSuffix = "AuthJWT"
export type TAuthPostfix = "RefreshToken" | "Token" | "UserId"
export type ISetAction = (
    partial:
        | TUseAuth
        | Partial<TUseAuth>
        | ((state: TUseAuth) => TUseAuth | Partial<TUseAuth>),
    replace?: boolean | undefined,
) => void
export type IGetAction = () => TUseAuth
interface ISetToken {
    token: string
    refreshToken: string
    userId: number
    expires: number
    ok: boolean
    email: string
}

interface IUser {
    firstName: string
    lastName: string
    username: string
    birthdate: Date | string
    about?: string
    enabled: boolean
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
    user?: IUser
    imageProfile?: IImageData
    createdUser?: string | Date
    addresses?: IAddressesResponse[]
}

export interface IAuthAction {
    updateProfile: DispatchWithoutAction
    refresh: DispatchWithoutAction
    getUser: Dispatch<(IUser & { profileId: number }) | null>
    changeAuth: DispatchWithoutAction
    setToken: Dispatch<ISetToken>
    signOut: DispatchWithoutAction
}
export type TUseAuth = IAuthState & IAuthAction
