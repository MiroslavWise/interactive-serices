import { Dispatch, FC, SetStateAction } from "react"

type TValue = string | number | null

export interface ISelectList {
    prefix?: string
    label: string
    value: TValue
}

interface ICustomSelect {
    placeholder: string
    list: ISelectList[]
    value: string | number | null
    setValue: Dispatch<string | number | null>
}

export type TCustomSelect = FC<ICustomSelect>
