import type { FC, Dispatch, DispatchWithoutAction, SetStateAction } from "react"

interface ISearchField{
  onSearch: Dispatch<string>
}

export type TSearchField = FC<ISearchField>