import type { IForgotPasswordHelper } from "./types/forgotPasswordHelper"

import { ForgotPasswordService } from "@/services/auth/forgotPasswordService"


export const useForgotPasswordHelper: IForgotPasswordHelper = {
  temporaryToken: null,
  saveTemporaryToken(value) {
    this.temporaryToken = value
  },

  async emailRequest(value) {
    return ForgotPasswordService.emailRequest(value)
  },
  async passwordRecovery(value) {
    return ForgotPasswordService.passwordRecovery(value)
  }
}