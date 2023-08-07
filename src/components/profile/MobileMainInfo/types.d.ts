import type { FC } from "react"

interface IMobileMainInfo{
  name: string
  photo: string
  about: string
}

export type TMobileMainInfo = FC<IMobileMainInfo>