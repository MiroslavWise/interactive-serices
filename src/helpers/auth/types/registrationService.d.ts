export interface IDataRegistration {
  email: string
  password: string
  repeat: string
}

export interface IReturnDataRegistration {
  registration: boolean
  error: any | null
  code?: number
  message?: any
  need_verify?: boolean
}

export interface IRegistrationService {
  public async registration(value: IDataRegistration): Promise<IReturnDataRegistration>
  public async verification(value: string): Promise<IReturnDataRegistration>
}