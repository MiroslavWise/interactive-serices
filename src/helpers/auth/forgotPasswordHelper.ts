import type { IForgotPasswordHelper } from "./types/forgotPasswordHelper"

import { ForgotPasswordService } from "@/services"

export const useForgotPasswordHelper: IForgotPasswordHelper = {
  temporaryToken: null,
  saveTemporaryToken(value) {
    this.temporaryToken = value
  },
  forgotPassword: (value) => ForgotPasswordService.forgotPassword(value),
  resetPassword: (value) => ForgotPasswordService.resetPassword(value),
}
