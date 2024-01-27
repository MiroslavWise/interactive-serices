import { IReturnData } from "@/services/types/general"
import { IResponseLoginNot2fa } from "./authService"

export interface IRequestPhone {
    phone: string
    agree?: boolean
}

export type TStatusOk = "ok"

export interface IResponsePhone {
    phone: string
    status: TStatusOk
    id: number
}

export interface IResponseTelegram {
    id: number
    first_name: string
    last_name: string
    username: string
    photo_url: string
    auth_date: number
    hash: string
}

export interface IAuth {
    route: string

    sms({ code, id }: { code: string; id: number | string }): Promise<IReturnData<IResponseLoginNot2fa>>
    phone(value: IRequestPhone): Promise<IReturnData<IResponsePhone>>
    postGoogle(values: Record<string, any>): Promise<IReturnData<IResponseLoginNot2fa>>
    postTelegram(values: Record<string, any>): Promise<IReturnData<IResponseLoginNot2fa>>
    postYandex(values: Record<string, any>): Promise<IReturnData<IResponseLoginNot2fa>>
    postVK(values: Record<string, any>): Promise<IReturnData<IResponseLoginNot2fa>>
}
