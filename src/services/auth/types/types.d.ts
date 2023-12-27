import { IReturnData } from "@/services/types/general"
import { IResponseLoginNot2fa } from "./authService"

export interface IRequestPhone {
    code: string
    country: string
    phone: string
}

export type TStatusOk = "ok"

export interface IResponsePhone {
    phone: string
    status: TStatusOk
}

export interface IAuth {
    route: string

    phone(value: IRequestPhone): Promise<IReturnData<IResponsePhone>>
    postGoogle(values: Record<string, any>): Promise<IReturnData<IResponseLoginNot2fa>>
}
