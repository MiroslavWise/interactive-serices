import type { Dispatch } from "react"
import type { IReturnData } from "@/services/types/general"
import type { IRequestLogin, IResponseLoginNot2fa, IResponseLoginOtp } from "@/services/auth/types/loggingService"

interface IRefreshToken {
  refresh: string
}

interface IAuthReturn{
  login: boolean
  secret?: string
  otpAuthUrl?: string
  error?: any
}

interface IRequestOtp{
  code: string
}
interface IResponseOtp{
  accessToken: string
  expiresIn: number
  id: number
  refreshToken: string
}
export interface IUseTokenHelper {
  private temporaryToken: string
  private saveTemporaryToken: Dispatch<string>

  public async login(value: IRequestLogin): Promise<IReturnData<IResponseLoginOtp & IResponseLoginNot2fa>>
  public async refresh(): Promise<IAuthReturn>
  public async serviceOtp(value: IRequestOtp): Promise<IReturnData<IResponseOtp>>

  get authToken(): string
  get authRefreshToken(): string
  get authUserId(): number
}