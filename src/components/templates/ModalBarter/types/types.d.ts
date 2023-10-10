import { FC } from "react"
import type {
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form"

export interface IValuesForm {
    categoryId: number | null
    date: Date | string | null
    address: number | null
    offerMyId: number | null
}

interface IContent {
    register: UseFormRegister<IValuesForm>
    setValue: UseFormSetValue<IValuesForm>
    watch: UseFormWatch<IValuesForm>
    address: string
}

export type TContent = FC<IContent>
