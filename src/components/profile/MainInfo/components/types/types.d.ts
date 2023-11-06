import type { FC, ReactNode } from "react"

export type TBlockOther = FC<{
  label: string
  children: ReactNode
  classNames?: string[]
}>