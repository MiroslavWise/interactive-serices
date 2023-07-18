import type { FC, Dispatch, SetStateAction } from "react"

import { TTypeSign } from "../../../types"

export type TContentSignIn = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  setVisible: Dispatch<SetStateAction<boolean>>
  setValueSecret: Dispatch<SetStateAction<{ url: string, secret: string }>>
}>

export type TContentForgotPassword = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  setValueEmail: Dispatch<SetStateAction<string>>
}>

export type TContentSignUp = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type TLinkItem = FC<{
  src: string
}>

export type TContentFirstLoginQR = FC<{
  valueSecret: { url: string, secret: string }
  setType: Dispatch<SetStateAction<TTypeSign>>
  setVisible: Dispatch<SetStateAction<boolean>>
}>

export type TContentOtpCode = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  setVisible: Dispatch<SetStateAction<boolean>>
}>

export type TContentPersonalEntry = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  setVisible: Dispatch<SetStateAction<boolean>>
}>

export type TContentCheckingEmail = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type TContentResetPassword = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  setVisible: Dispatch<SetStateAction<boolean>>
}>

export type TContentSelectVerification = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  typeVerification: "email" | "phone" | null
  setTypeVerification: Dispatch<SetStateAction<"email" | "phone" | null>>
}> 

export type THeaderModal = FC<{
  type: TTypeSign
  email: string
  typeVerification: "email" | "phone" | null
}>

export type TContentCodeVerification = FC<{
  setType: Dispatch<SetStateAction<TTypeSign>>
  typeVerification: "email" | "phone" | null
}>

export interface IValuesRegistrationForm {
  email: string
  number?: string
  password: string
  repeat_password: string
}

export interface IValuesSignForm {
  email: string
  password: string
  checkbox: boolean
}

export interface IValuesPersonForm {
  username: string
  firstName: string
  lastName: string
  day: string | number
  month: string
  year: string | number
  about: string
}