import type { DispatchWithoutAction } from "react"

export interface IPropsImageStatic{
  src: any
  alt: string
  classNames: any[]
  width: number
  height: number

  onClick?: DispatchWithoutAction
}