import type { FC } from "react"


interface ISearchInput{
  placeholder: string
  classNames?: string[]
}

export type TSearchInput = FC<ISearchInput>