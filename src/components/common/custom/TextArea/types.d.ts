import type { Dispatch, FC, SetStateAction } from "react"

export interface ICustomTextArea{
    placeholder: string
    value: string
    setValue: Dispatch<string>
}

export type TCustomTextArea = FC<ICustomTextArea>