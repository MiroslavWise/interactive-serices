import type {
    IForgotPasswordService,
    IForgotPassword,
    IForgotPasswordResponse,
    IPasswordRecovery,
    IResetPasswordResponse,
} from "./types/forgotPasswordService"

import { wrapperFetch } from "@/services/requestsWrapper"

export const ForgotPasswordService: IForgotPasswordService = {
    forgotPassword(value) {
        return wrapperFetch.methodPost<
            IForgotPassword,
            IForgotPasswordResponse
        >("/auth/forgot-password", value)
    },
    resetPassword(value) {
        return wrapperFetch.methodPost<
            IPasswordRecovery,
            IResetPasswordResponse
        >("/auth/reset-password", value)
    },
}
