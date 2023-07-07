import type { Dispatch } from "react"
import type { IReturnData } from "@/services/types/general"
import type { IRequestLogin, IResponseLogin } from "@/services/auth/types/loggingService"

interface IRefreshToken {
  refresh: string
}

interface IAuthReturn{
  login: boolean
  secret?: string
  otp_auth_url?: string
  error?: any
}

interface IRequestOtp{
  code: string
}
interface IResponseOtp{
  access_token: string
  expires_in: number
  id: number
  refresh_token: string
}
export interface IUseTokenHelper {
  private temporaryToken: string
  private saveTemporaryToken: Dispatch<string>

  public async login(value: IRequestLogin): Promise<IReturnData<IResponseLogin>>
  public async refresh(): Promise<IAuthReturn>
  public async serviceOtp(value: IRequestOtp): Promise<IReturnData<IResponseOtp>>

  get authToken(): string
  get authRefreshToken(): string
  get authUserId(): number
}