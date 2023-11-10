import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react"

interface ITextArea {
    sup?: string
}

export type TTypeTextArea = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> &
    ITextArea
