import type { FC } from "react"

interface ICustomInputText {
    placeholder: string
    classNames?: string[]
}

export type TCustomInputText = FC<ICustomInputText>
