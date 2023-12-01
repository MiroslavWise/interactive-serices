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
    | null

export interface IAction {
    visible?: boolean
    type?: TTypeSign
}
export interface IUseVisibleAndTypeAuthModalState {
    visible: boolean
    type: TTypeSign
}
