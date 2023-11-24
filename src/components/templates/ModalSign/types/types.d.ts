import type { FC, Dispatch, SetStateAction } from "react"

import { TTypeSign } from "@/store/types/useVisibleAndTypeAuthModalState"

export interface IResetEmailData {
    email: string
    password_reset_expires: number | null
    password_reset_token: string
}

export type TContentSignIn = FC<{
    setValueSecret: Dispatch<SetStateAction<{ url: string; secret: string }>>
}>

export type TContentForgotPassword = FC<{
    setValueEmail: Dispatch<SetStateAction<IResetEmailData>>
}>

export type TContentSignUp = FC<{}>

export type TLinkItem = FC<{
    src: string
    path: string
    isActive: boolean
}>

export type TContentFirstLoginQR = FC<{
    valueSecret: { url: string; secret: string }
}>

export type TContentOtpCode = FC<{}>

export type TContentCheckingEmail = FC<{
    setType: Dispatch<SetStateAction<TTypeSign>>
}>

export type TContentResetPassword = FC<{}>

export type TContentSelectVerification = FC<{
    typeVerification: "email" | "phone" | null
    setTypeVerification: Dispatch<SetStateAction<"email" | "phone" | null>>
}>

export type THeaderModal = FC<{
    email: string
    typeVerification: "email" | "phone" | null
}>

export type TContentCodeVerification = FC<{
    typeVerification: "email" | "phone" | null
    valueEmail: IResetEmailData
}>

export interface IValuesRegistrationForm {
    __iremqwer__: string //email
    __wererfsdfwef__: string //password
    __rwersdf__asdfsadf__: string //repeat_password
    checkbox: boolean //checkbox
}

export interface IValuesSignForm {
    finaly_qwer: string
    _qwer_rrewwrerq: string
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

import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"

export type TButtonSelection = FC<{
    active: boolean
    onClick: DispatchWithoutAction
    label: string
    image: string
}>

export type TCircleImageHeader = FC<{
    src: string
}>

export type TImageUploadComponent = FC<{
    selectedImage: string | null
    setSelectedImage: Dispatch<SetStateAction<string | null>>
    setFile: Dispatch<SetStateAction<File | null>>
}>

export interface ILinkSocial {
    value: string
    srcWorking: string
    srcNotWorking: string
    path: string
    isWorkingLink: boolean
}
