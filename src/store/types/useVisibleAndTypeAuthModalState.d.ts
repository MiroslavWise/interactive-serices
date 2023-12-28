import type { Dispatch } from "react"

export type TTypeSign =
    | "SignIn"
    | "SignUp"
    | "SelectVerification"
    | "ForgotPassword"
    | "FirstLoginQR"
    | "OtpCode"
    | "ResetPassword"
    | "CodeVerification"
    | "CreatePassword"
    | null

export interface IAction {
    visible?: boolean
    type?: TTypeSign
}

export interface IActionCreatePassword {
    email?: string
    phone?: string
}
export interface IUseVisibleAndTypeAuthModalState {
    visible: boolean
    type: TTypeSign
    email?: string
    phone?: string
}

export interface IUseTimerModalAuth {
    time?: string
}
