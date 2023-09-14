import type {
    IForgotPasswordService,
    IForgotPassword,
    IForgotPasswordResponse,
    IPasswordRecovery,
    IResetPasswordResponse,
} from "./types/forgotPasswordService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const ForgotPasswordService: IForgotPasswordService = {
    route: "/auth",
    forgotPassword(value) {
        return wrapperFetch.methodPost<
            IForgotPassword,
            IForgotPasswordResponse
        >(`${this.route}/forgot-password`, value)
    },
    resetPassword(value) {
        return wrapperFetch.methodPost<
            IPasswordRecovery,
            IResetPasswordResponse
        >(`${this.route}/reset-password`, value)
    },
}
