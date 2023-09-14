import { IReturnData } from "@/services/types/general"

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
  public registration(value: IDataRegistration): Promise<IReturnData<IResponseDataRegistration>>
  public verification(value: {code: string}): Promise<IReturnData<IResponseDataRegistration>>
}