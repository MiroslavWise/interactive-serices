import type { Dispatch, DispatchWithoutAction } from "react"

type TAlt = "avatar" | "offer"
export interface IPropsImageStatic {
    src: string
    alt: TAlt | string
    classNames?: any[]
    onClick?: DispatchWithoutAction & Dispatch<any> & any
}
