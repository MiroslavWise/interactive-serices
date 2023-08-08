import type { DispatchWithoutAction, FC } from "react"

export type TFooterMenu = FC<{}>

export interface IItemsMenu {
  label: string
  path: string | null
  icon: {
    fill: string
    regular: string
  }
  isCenter: boolean
  key: string
}