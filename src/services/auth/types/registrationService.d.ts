import { IReturnData } from "@/services/types/general"

export interface IDataRegistration {
  email: string
  password: string
  repeat: string
}

export interface IResponseDataRegistration {
  confirmation_code: string
  id: number
}

export interface IRegistrationService {
  public async registration(value: IDataRegistration): Promise<IReturnData<IResponseDataRegistration>>
  public async verification(value: {code: string}): Promise<IReturnData<IResponseDataRegistration>>
}