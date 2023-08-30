import type { Dispatch } from "react"

export type TTypeSign =
    | "SignIn"
    | "SignUp"
    | "SelectVerification"
    | "PersonalEntry"
    | "ForgotPassword"
    | "FirstLoginQR"
    | "OtpCode"
    | "ResetPassword"
    | "CodeVerification"
    | null

export interface IUseVisibleAndTypeAuthModalState {
    visible: boolean
    type: TTypeSign

    setVisibleAndType: Dispatch<{ visible?: boolean; type?: TTypeSign }>
}
