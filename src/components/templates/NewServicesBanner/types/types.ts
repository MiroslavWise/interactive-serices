import type { FC } from "react"
import { EnumTypeProvider } from "@/types/enum"

interface INewServicesBanner {}

export interface INewCreateBadge {
  imageSrc: React.ReactNode
  label: string
  value: EnumTypeProvider
}

export type TNewServicesBanner = FC<INewServicesBanner>
export type TNewCreateBadge = FC<INewCreateBadge>

export interface IPositionArticle {
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
}
