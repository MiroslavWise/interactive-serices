import type { Dispatch, FC } from "react"

interface ICustomInputText {
    placeholder: string
    classNames?: string[]
    onChange?: Dispatch<any>
}

export type TCustomInputText = FC<ICustomInputText>
