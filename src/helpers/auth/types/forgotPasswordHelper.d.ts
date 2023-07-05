import type { Dispatch } from "react"

import { IReturnData } from "@/services/types/general"
import { IForgotPasswordResponse, IResetPasswordResponse, IForgotPassword, IPasswordRecovery } from "@/services/auth/types/forgotPasswordService"

export interface IForgotPasswordHelper{
  private temporaryToken: string | null
  public saveTemporaryToken: Dispatch<string>

  async emailRequest(value: IForgotPassword): Promise<IReturnData<IForgotPasswordResponse>>
  async passwordRecovery(value: IPasswordRecovery): Promise<IReturnData<IResetPasswordResponse>>
}