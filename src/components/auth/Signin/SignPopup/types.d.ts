import type { Dispatch, FC, SetStateAction } from "react"

export type TSignPopup = FC<{
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  type: TTypeSign
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type TTypeSign =
  "SignIn"
  | "SignUp"
  | "SelectVerification"
  | "CheckingEmail"
  | "CodeVerificationTelegram"
  | "PersonalEntry"
  | "ForgotPassword"
  | "FirstLoginQR"
  | "OtpCode"
  | "ResetPassword"
  | null