import type { Dispatch } from "react"

import { IReturnData } from "@/services/types/general"
import {
    IForgotPasswordResponse,
    IResetPasswordResponse,
    IForgotPassword,
    IPasswordRecovery,
} from "@/services/auth/types/forgotPasswordService"

export interface IForgotPasswordHelper {
    temporaryToken: string | null
    saveTemporaryToken: Dispatch<string>

    forgotPassword(
        value: IForgotPassword,
    ): Promise<IReturnData<IForgotPasswordResponse>>
    resetPassword(
        value: IPasswordRecovery,
    ): Promise<IReturnData<IResetPasswordResponse>>
}
