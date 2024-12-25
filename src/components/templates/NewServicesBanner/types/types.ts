import { type FC } from "react"
import { EnumTypeProvider } from "@/types/enum"

export interface INewCreateBadge {
  label: string
  value: EnumTypeProvider
  assistance: string
}

export type TNewCreateBadge = FC<INewCreateBadge>
