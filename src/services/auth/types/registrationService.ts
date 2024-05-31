import type { IReturnData } from "@/services/types/general"
import type { IResponseLoginNot2fa } from "./authService"
import { IAgree } from "./typeAgree"

export interface IDataRegistration extends IAgree {
  email: string
  password: string
  repeat: string
}

export interface IResponseDataRegistration {
  confirmationCode: string
  id: number
}

export interface IRegistrationService {
  registration(value: IDataRegistration, urlSearchParams?: string): Promise<IReturnData<IResponseDataRegistration>>
  verification(value: { code: string }): Promise<IReturnData<IResponseLoginNot2fa>>
}
