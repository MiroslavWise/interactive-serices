import { FC } from "react"
import type {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form"

export interface IValuesForm {
    categoryId: number | null
    address: number | null
    offerMyId: number | null
    day?: string
    month?: string
    year?: string
}

interface IGroupSelectorDate {
    label: string
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

interface IContent {
    register: UseFormRegister<IValuesForm>
    setValue: UseFormSetValue<IValuesForm>
    watch: UseFormWatch<IValuesForm>
    address: string
    errors: FieldErrors<IValuesForm>
}

export type TContent = FC<IContent>
export type TGroupSelectorDate = FC<IGroupSelectorDate>
