import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import type { DispatchWithoutAction, Dispatch } from "react"

export type TAuthSuffix = "AuthJWT"
export type TAuthPostfix = "RefreshToken" | "Token" | "UserId"
export type ISetAction = (
    partial:
        | IUseAuth
        | Partial<IUseAuth>
        | ((state: IUseAuth) => IUseAuth | Partial<IUseAuth>),
    replace?: boolean | undefined,
) => void
export type IGetAction = () => IUseAuth
interface ISetToken {
    token: string
    refreshToken: string
    userId: number
    expires: number
    ok: boolean
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

export interface IUseAuth {
    email: undefined | string
    expires: undefined | number
    token: string | undefined
    refreshToken: string | undefined
    userId: number | undefined
    profileId: number | undefined
    isAuth: boolean | undefined
    user: IUser | undefined
    imageProfile: IImageData | undefined
    createdUser: string | undefined | Date
    addresses: IAddressesResponse[]

    refresh: DispatchWithoutAction
    getUser: Dispatch<(IUser & { profileId: number }) | null>
    changeAuth: DispatchWithoutAction
    setToken: Dispatch<ISetToken>
    signOut: DispatchWithoutAction
}
