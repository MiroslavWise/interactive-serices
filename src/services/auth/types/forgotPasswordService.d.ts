import type { Dispatch } from "react"

import type { IReturnData } from "@/services/types/general"

export interface IPasswordRecovery{
  token: string
  password: string
  repeat: string
}

export interface IForgotPassword{
  email: string
}

export interface IResetPasswordResponse{
  id: number
}

export interface IForgotPasswordResponse{
  id: number
  password_reset_token: string
  password_reset_expires: number
}

export interface IForgotPasswordService{
  async emailRequest: (value: IForgotPassword) => Promise<IReturnData<IForgotPasswordResponse>>
  async passwordRecovery: (value: IPasswordRecovery) => Promise<IReturnData<IResetPasswordResponse>>
}