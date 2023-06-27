import type { Dispatch, FC, SetStateAction } from 'react'

export type TSingModulePopup = FC<{
        visible: boolean
        setVisible: Dispatch<SetStateAction<boolean>>
        type: TTypeSing
        setType: Dispatch<SetStateAction<TTypeSing>>
}>

export type TContentSignIn = FC<{
        setType: Dispatch<SetStateAction<TTypeSing>>
}>

export type TContentForgotPassword = FC<{
        setType: Dispatch<SetStateAction<TTypeSing>>
}>

export type TContentSingUp = FC<{
        setType: Dispatch<SetStateAction<TTypeSing>>
}>

export type THeaderModal = FC<{
        type: TTypeSing
}>

export type TLinkItem = FC<{
        src: string
}>

export type TTypeSing = 'SingIn' | 'SingUp' | 'SelectVerification' | 'CodeVerification' | 'PersonalEntry' | 'ForgotPassword'