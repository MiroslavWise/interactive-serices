import type { FC } from "react"

interface IMobileMainInfo{
  name: string
  photo: string
  about: string
  userId: number
  created: Date | string
}

export type TMobileMainInfo = FC<IMobileMainInfo>