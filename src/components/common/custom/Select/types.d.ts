import { Dispatch, FC, SetStateAction } from "react"

type TValue = string | number

export interface ISelectList {
    prefix?: string
    label: string
    value: TValue
}

interface ICustomSelect {
    placeholder: string
    list: ISelectList[]
    value: TValue
    setValue: Dispatch<SetStateAction<TValue>> | Dispatch<TValue>
}

export type TCustomSelect = FC<ICustomSelect>
