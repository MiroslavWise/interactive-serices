import type { IUserResponse } from "@/services/users/types"
import { z } from "zod"

export type TTypeSign =
  | "SignIn"
  | "SignUp"
  | "SelectVerification"
  | "ForgotPassword"
  | "ResetPassword"
  | "CodeVerification"
  | "CreatePassword"
  | "ExistingAccount"
  | "InformationEmailReset"
  | "InformationCreateAccount"
  | "CurrentUser"
  | "NumberConfirmation"
  | null

export interface IAction {
  visible?: boolean
  type?: TTypeSign
  email?: string
}

export interface IActionCreatePassword {
  email?: string
  phone?: string
  agree: boolean
  marketing: boolean
}
export interface IUseVisibleAndTypeAuthModalState {
  type: TTypeSign
  prevType: TTypeSign
  email?: string
  agree?: boolean
  marketing?: boolean
  phone?: string
  verification?: {
    confirmationCode: string
    id: number
  }
  codeReset?: string
  user?: IUserResponse
  idUser?: number | string
}

const time = z.number().default(Date.now()).optional()
type TTime = z.infer<typeof time>

export interface IUseTimerModalAuth {
  time: TTime
}

export type TTypeEmailOrNumber = "email" | "phone"
export interface IUseModalAuthEmailOrPhone {
  typeEmailOrPhone: TTypeEmailOrNumber
}

export interface IActionAuthModalVerification {
  confirmationCode: string
  id: number
}
