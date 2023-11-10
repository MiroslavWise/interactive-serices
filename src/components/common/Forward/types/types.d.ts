import type { DetailedHTMLProps, InputHTMLAttributes } from "react"

interface IInputData {
    label?: string
    error?: string
    rules?: boolean
}

export type TTypeInput = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & IInputData
