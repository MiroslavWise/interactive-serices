import type { DispatchWithoutAction, FC, ReactNode, Ref } from "react"

export type TMotion = FC<{
  children: ReactNode
  classNames?: (string | any)[]
  onClick?: DispatchWithoutAction
  id?: string
  ref?: Ref<HTMLLIElement>
}>