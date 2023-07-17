import type { Dispatch, DispatchWithoutAction, FC, SetStateAction } from "react"



export type TButtonSelection = FC<{
  active: boolean
  onClick: DispatchWithoutAction
  label: string
  image: string
}>

export type TCircleImageHeader = FC<{
  src: string
}>