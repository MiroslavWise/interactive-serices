import type { Dispatch } from "react"
import type { IReturnData } from "@/services/types/general"
import type { IRequestLogin, IResponseLoginNot2fa, IResponseLoginOtp } from "@/services/auth/types/authService"

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
  expires: number
  refreshToken: string
}
export interface IUseTokenHelper {
  temporaryToken: string
  saveTemporaryToken: Dispatch<string>

  login(value: IRequestLogin): Promise<IReturnData<IResponseLoginOtp & IResponseLoginNot2fa>>
  serviceOtp(value: IRequestOtp): Promise<IReturnData<IResponseOtp>>

  get authToken(): string
}