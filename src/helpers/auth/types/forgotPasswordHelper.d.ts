import type { Dispatch } from "react"

import { IReturnData } from "@/services/types/general"
import { IForgotPasswordResponse, IResetPasswordResponse, IForgotPassword, IPasswordRecovery } from "@/services/auth/types/forgotPasswordService"

export interface IForgotPasswordHelper{
  temporaryToken: string | null
  public saveTemporaryToken: Dispatch<string>

  public async forgotPassword(value: IForgotPassword): Promise<IReturnData<IForgotPasswordResponse>>
  public async resetPassword(value: IPasswordRecovery): Promise<IReturnData<IResetPasswordResponse>>
}