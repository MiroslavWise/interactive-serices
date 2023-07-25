import type { DispatchWithoutAction, FC, ReactNode } from "react"

export type TMotion = FC<{
  children: ReactNode
  classNames?: (string | any)[]
  onClick?: DispatchWithoutAction
}>