import type { FC } from "react"
import { EnumTypeProvider } from "@/types/enum"

interface INewServicesBanner {}

export interface INewCreateBadge {
  label: string
  value: EnumTypeProvider
}

export type TNewServicesBanner = FC<INewServicesBanner>
export type TNewCreateBadge = FC<INewCreateBadge>
