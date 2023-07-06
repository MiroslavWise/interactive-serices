import type { IForgotPasswordService, IForgotPassword, IForgotPasswordResponse, IPasswordRecovery, IResetPasswordResponse } from "./types/forgotPasswordService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const ForgotPasswordService: IForgotPasswordService = {
  async forgotPassword({ email }) {
    return wrapperFetch.methodPost<IForgotPassword, IForgotPasswordResponse>("/auth/forgot-password", {email})
  },
  async resetPassword({ token, password, repeat }) {
    return wrapperFetch.methodPost<IPasswordRecovery, IResetPasswordResponse>("/auth/reset-password", { token, password, repeat })
  }
}