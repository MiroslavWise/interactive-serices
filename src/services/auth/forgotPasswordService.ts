import type { IForgotPasswordService } from "./types/forgotPasswordService"

import { wrapperPost } from "@/services/request"

const route = "/auth"

export const ForgotPasswordService: IForgotPasswordService = {
  forgotPassword: (body) => wrapperPost({ url: `${route}/forgot-password`, body }),
  resetPassword: (body) => wrapperPost({ url: `${route}/reset-password`, body }),
}
