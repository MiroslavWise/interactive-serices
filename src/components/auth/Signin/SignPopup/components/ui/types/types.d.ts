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
}> 

export type THeaderModal = FC<{
  type: TTypeSign
  email: string
}>