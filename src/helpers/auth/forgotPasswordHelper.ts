import type { IForgotPasswordHelper } from "./types/forgotPasswordHelper"

import { ForgotPasswordService } from "@/services"

export const useForgotPasswordHelper: IForgotPasswordHelper = {
    temporaryToken: null,
    saveTemporaryToken(value) {
        this.temporaryToken = value
    },
    forgotPassword(value) {
        return ForgotPasswordService.forgotPassword(value)
    },
    resetPassword(value) {
        return ForgotPasswordService.resetPassword(value)
    },
}
