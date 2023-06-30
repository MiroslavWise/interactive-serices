import type { Dispatch, FC, SetStateAction } from "react"

export type TSignPopup = FC<{
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  type: TTypeSign
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type TContentSignIn = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  setVisible: Dispatch<SetStateAction<boolean>>
}>

export type TContentForgotPassword = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type TContentSignUp = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type THeaderModal = FC<{
  type: TTypeSign
}>

export type TLinkItem = FC<{
  src: string
}>

export type TTypeSign = "SignIn" | "SignUp" | "SelectVerification" | "CodeVerification" | "PersonalEntry" | "ForgotPassword"