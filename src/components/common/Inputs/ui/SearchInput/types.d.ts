import type { Dispatch, FC } from "react"

interface ISearchInput {
    value: string
    placeholder: string
    classNames?: string[]

    setValue: Dispatch<string>
}

export type TSearchInput = FC<ISearchInput>
