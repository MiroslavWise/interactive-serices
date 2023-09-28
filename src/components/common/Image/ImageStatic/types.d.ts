import type { DispatchWithoutAction } from "react"

type TAlt = "avatar" | "offer"
export interface IPropsImageStatic {
    src: any
    alt: TAlt | string
    classNames?: any[]
    width: number
    height: number

    onClick?: DispatchWithoutAction
}
