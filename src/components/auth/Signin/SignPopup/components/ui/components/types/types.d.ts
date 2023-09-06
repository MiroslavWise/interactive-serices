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

export type TLabelInputGroup = FC<{
    label: string
    rules?: boolean
    placeholder: string
    type: "text" | "email" | "password"
    propsInput: UseFormRegisterReturn
    errorMessage?: string
}>

export type TGroupSelectorDate = FC<{
    watchDay: any
    watchMonth: any
    watchYear: any
    set: UseFormSetValue<any>
    errorDate: {
        day: FieldError | undefined
        month: FieldError | undefined
        year: FieldError | undefined
    }
    propsRegister: {
        day: UseFormRegisterReturn
        month: UseFormRegisterReturn
        year: UseFormRegisterReturn
    }
}>
