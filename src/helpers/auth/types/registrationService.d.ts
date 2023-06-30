export interface IDataRegistration {
  email: string
  password: string
  repeat: string
}

export interface IReturnDataRegistration{
  registration: boolean
  error: any | null
  code?: number
  message?: any
  need_verify?: boolean
}