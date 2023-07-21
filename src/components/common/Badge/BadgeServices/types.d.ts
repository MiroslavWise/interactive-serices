import type { FC } from "react"

export interface IBadgeServices {
  photo: string
  label: string
}

export type TBadgeServices = FC<IBadgeServices>