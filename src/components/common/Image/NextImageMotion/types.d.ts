import type { DispatchWithoutAction, FC } from "react"
import type { Variants } from "framer-motion"

interface IImage {
    src: string
    alt: "avatar" | "offer-image" | string
    width: number
    height: number
    className?: string
    onClick?: DispatchWithoutAction
}

export type TImage = FC<IImage>
