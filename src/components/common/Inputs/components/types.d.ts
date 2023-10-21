import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react"

interface ITextArea {
    sup?: string
}

type TTypeTextArea = DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
> &
    ITextArea