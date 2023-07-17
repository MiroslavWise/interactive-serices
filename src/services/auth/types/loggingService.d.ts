import { IReturnData } from "@/services/types/general"


export interface IRequestLogin{
  email: string
  password: string
}

export interface IResponseLogin{
  access_token: string
  secret?: string
  otp_auth_url?: string
}


export interface ILoggingService{
  public async login(value: IRequestLogin): Promise<IReturnData<IResponseLogin>>
}