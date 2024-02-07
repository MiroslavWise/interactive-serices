import type {
  IForgotPasswordService,
  IForgotPassword,
  IForgotPasswordResponse,
  IPasswordRecovery,
  IResetPasswordResponse,
} from "./types/forgotPasswordService"

import { wrapperPost } from "@/services/requestsWrapper"

const route = "/auth"

export const ForgotPasswordService: IForgotPasswordService = {
  forgotPassword: (body) => wrapperPost<IForgotPassword, IForgotPasswordResponse>({ url: `${route}/forgot-password`, body }),
  resetPassword: (body) => wrapperPost<IPasswordRecovery, IResetPasswordResponse>({ url: `${route}/reset-password`, body }),
}
