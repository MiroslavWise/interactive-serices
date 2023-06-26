import type { Dispatch, FC, SetStateAction } from 'react'

export type TSingModulePopup = FC<{
        visible: boolean
        setVisible: Dispatch<SetStateAction<boolean>>
        type: TTypeSing
        setType: Dispatch<SetStateAction<TTypeSing>>
}>
export type TTypeSing = 'SingIn' | 'SingUp' | 'SelectVerification' | 'CodeVerification' | 'PersonalEntry' | 'ForgotPassword'