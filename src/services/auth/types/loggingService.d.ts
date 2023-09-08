import { IReturnData } from "@/services/types/general"


export interface IRequestLogin{
  email: string
  password: string
}

export interface IResponseLoginOtp{
  accessToken: string
  secret?: string
  otpAuthUrl?: string
}

export interface IResponseLoginNot2fa{
  accessToken: string
  expiresIn: number
  refreshToken: string
  scope: string
  tokenType: string
  id: number
}


export interface ILoggingService{
  public async login(value: IRequestLogin): Promise<IReturnData<IResponseLoginOtp & IResponseLoginNot2fa>>
}