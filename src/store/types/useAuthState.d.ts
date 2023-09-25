import { IAddressesResponse } from "@/services/addresses/types/serviceAddresses"
import type { DispatchWithoutAction, Dispatch } from "react"

export type TAuthSuffix = "AuthJWT"
export type TAuthPostfix = "RefreshToken" | "Token" | "Expiration" | "UserId"
export type ISetAction = (
    partial:
        | IUseAuth
        | Partial<IUseAuth>
        | ((state: IUseAuth) => IUseAuth | Partial<IUseAuth>),
    replace?: boolean | undefined
) => void
export type IGetAction = () => IUseAuth
interface ISetToken {
    token: string
    refreshToken: string
    expiration: number
    userId: number
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
    token: string | undefined
    refreshToken: string | undefined
    userId: number | undefined
    profileId: number | undefined
    expiration: number | undefined
    isAuth: boolean
    user: IUser | undefined
    imageProfile: IImageData | undefined
    createdUser: string | undefined | Date
    addresses: IAddressesResponse[]

    getUser: Dispatch<(IUser & { profileId: number }) | null>
    changeAuth: DispatchWithoutAction
    setToken: Dispatch<ISetToken>
    signOut: DispatchWithoutAction
    retrieveProfileData: DispatchWithoutAction
}
