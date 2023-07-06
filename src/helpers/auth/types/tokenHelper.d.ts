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

}
export interface IUseTokenHelper {
  private temporaryToken: string
  private saveTemporaryToken: Dispatch<string>

  public async login(value: IRequestLogin): Promise<IReturnData<IResponseLogin>>
  public async refresh(): Promise<IAuthReturn>
  public async serviceOtp(value: IRequestOtp): Promise<IReturnData<IResponseOtp>>
  public async signOut(): Promise<any>

  get authToken(): string
  get authRefreshToken(): string
  get authUserId(): string
  get isAuth(): boolean
}