import type { IForgotPasswordHelper } from "./types/forgotPasswordHelper"

import { ForgotPasswordService } from "@/services/auth/forgotPasswordService"


export const useForgotPasswordHelper: IForgotPasswordHelper = {
  temporaryToken: null,
  saveTemporaryToken(value) {
    this.temporaryToken = value
  },

  async forgotPassword(value) {
    return ForgotPasswordService.forgotPassword(value)
  },
  async resetPassword(value) {
    return ForgotPasswordService.resetPassword(value)
  }
}