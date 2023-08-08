import { IReturnData } from "@/services/types/general"


export interface IRequestLogin{
  email: string
  password: string
}

export interface IResponseLoginOtp{
  access_token: string
  secret?: string
  otp_auth_url?: string
}

export interface IResponseLoginNot2fa{
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
  id: number
}


export interface ILoggingService{
  public async login(value: IRequestLogin): Promise<IReturnData<IResponseLoginOtp & IResponseLoginNot2fa>>
}