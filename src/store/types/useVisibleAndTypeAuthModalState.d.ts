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
    | "ExistingAccount"
    | "InformationEmailReset"
    | "InformationCreateAccount"
    | null

export interface IAction {
    visible?: boolean
    type?: TTypeSign
    email?: string
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
    verification?: {
        confirmationCode: string
        id: number
    }
    codeReset?: string
}

export interface IUseTimerModalAuth {
    time?: string
}

export type TTypeEmailOrNumber = "email" | "phone"
export interface IUseModalAuthEmailOrPhone {
    typeEmailOrPhone: TTypeEmailOrNumber
}

export interface IActionAuthModalVerification {
    confirmationCode: string
    id: number
}
