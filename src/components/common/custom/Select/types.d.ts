import { Dispatch, FC, SetStateAction } from "react"

type TValue = string

export interface ISelectList{
  prefix?: string
  label: string
  value:TValue
}

interface ICustomSelect{
  placeholder: string
  list: ISelectList[]
  value: TValue
  setValue: Dispatch<SetStateAction<TValue>>
}

export type TCustomSelect = FC<ICustomSelect>