import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface IInputData {
    label?: string
    error?: string
    rules?: boolean
}

interface IButton {
    label?: string
    
}

export type TTypeInput = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> &
    IInputData

export type TTypeButton = DetailedHTMLProps<
    InputHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> &
    IButton
