import type { FC } from "react"
import type { FieldError, UseFormRegisterReturn, UseFormSetValue } from "react-hook-form"

interface ILabelInput{
    label: string
    rules?: boolean
    placeholder: string
    type: "text" | "email" | "password"
    propsInput: UseFormRegisterReturn
    errorMessage?: string
}

interface IGroupSelectorDate{
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
}

interface IItemsAdress{

}

interface IItemLIAdress{
    active: boolean
}

export type TLabelInput = FC<ILabelInput>
export type TGroupSelectorDate = FC<IGroupSelectorDate>
export type TItemsAdress = FC<IItemsAdress>
export type TItemLIAdress = FC<IItemLIAdress>