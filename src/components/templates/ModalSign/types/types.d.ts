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

export type TContentForgotPassword = FC<{}>

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

export type THeaderModal = FC<{}>

export type TContentCodeVerification = FC<{}>

export interface IValuesRegistrationForm {
    email: string //email
    phone: string
    country: string
    code: string
    // password: string //password
    // repeat_password: string //repeat_password
    checkbox: boolean //checkbox
    checkbox_personal_data: boolean //checkbox
}

export interface IValuesSignForm {
    email: string
    password: string
    phone: string
    country: string
    code: string
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
