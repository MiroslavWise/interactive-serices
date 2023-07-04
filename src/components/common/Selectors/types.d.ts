import type { FC, Dispatch, SetStateAction, DispatchWithoutAction } from "react"
import type { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form"

interface ISelectors{
  param: string
  options: {
    value: any
    label: any
  }[]
  label: string
  watchField?: any
  set: UseFormSetValue<any>
  register: UseFormRegisterReturn
}

export type TSelectors = FC<ISelectors>