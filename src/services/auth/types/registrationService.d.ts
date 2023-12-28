import type { IReturnData } from "@/services/types/general"

export interface IDataRegistration {
    email: string
    password: string
    repeat: string
}

export interface IResponseDataRegistration {
    confirmationCode: string
    id: number
}

export interface IRegistrationService {
    registration(value: IDataRegistration): Promise<IReturnData<IResponseDataRegistration>>
    verification(value: { code: string }): Promise<IReturnData<IResponseDataRegistration>>
}
